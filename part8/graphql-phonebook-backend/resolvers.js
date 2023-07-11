const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const Person = require('./models/person');
const User = require('./models/user');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const { v1: uuid } = require('uuid');

const resolvers = {
	Query: {
		personCount: async () => Person.collection.countDocuments(),
		allPersons: async (root, args) => {
			if (!args.phone) return Person.find({});

			return Person.find({ phone: { $exists: args.phone === 'YES' } });
		},
		findPerson: async (root, args) => Person.findOne({ name: args.name }),

		// If there is no valid token in the header attached to the request,
		// the query returns null
		me: (root, args, context) => {
			return context.currentUser;
		},
	},
	Person: {
		address: root => {
			return {
				street: root.street,
				city: root.city,
			};
		},
	},
	Mutation: {
		// addPerson: async (root, args) => {
		// 	const person = new Person({ ...args });

		// 	try {
		// 		await person.save();
		// 	} catch (error) {
		// 		throw new GraphQLError('Saving person failed', {
		// 			extensions: {
		// 				code: 'BAD_USER_INPUT',
		// 				invalidArgs: args.name,
		// 				error,
		// 			},
		// 		});
		// 	}

		// 	return person;
		// },
		addPerson: async (root, args, context) => {
			const person = new Person({ ...args });
			const currentUser = context.currentUser;

			if (!currentUser) {
				throw new GraphQLError('not authenticated', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				});
			}

			try {
				await person.save();
				currentUser.friends = currentUser.friends.concat(person);
				await currentUser.save();
			} catch (error) {
				throw new GraphQLError('Saving user failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error,
					},
				});
			}

			pubsub.publish('PERSON_ADDED', { personAdded: person });
			return person;
		},
		editNumber: async (root, args) => {
			const person = await Person.findOne({ name: args.name });
			person.phone = args.phone;

			try {
				await person.save();
			} catch (error) {
				throw new GraphQLError('Saving number failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error,
					},
				});
			}
			return person;
		},

		// users handling
		createUser: async (root, args) => {
			const user = new User({ username: args.username });

			return user.save().catch(error => {
				throw new GraphQLError('Creating the user failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
						error,
					},
				});
			});
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			// Password is constant in this case.
			if (!user || args.password !== 'secret') {
				throw new GraphQLError('wrong credentials', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				});
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		},
		addAsFriend: async (root, args, { currentUser }) => {
			const isFriend = person =>
				currentUser.friends
					.map(f => f._id.toString())
					.includes(person._id.toString());

			if (!currentUser) {
				throw new GraphQLError('wrong credentials', {
					extensions: { code: 'BAD_USER_INPUT' },
				});
			}

			const person = await Person.findOne({ name: args.name });
			if (!isFriend(person))
				currentUser.friends = currentUser.friends.concat(person);

			await currentUser.save();

			return currentUser;
		},
	},
	Subscription: {
		personAdded: {
			subscribe: () => pubsub.asyncIterator('PERSON_ADDED'),
		},
	},
};

module.exports = resolvers;
/**
 * normal connection
startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`server ready at ${url}`);
});
 * 
*/

/**
 * WITHOUT DB
let persons = [
	{
		name: 'Arto Hellas',
		phone: '040-123543',
		street: 'Tapiolankatu 5 A',
		city: 'Espoo',
		id: '3d594650-3436-11e9-bc57-8b80ba54c431',
	},
	{
		name: 'Matti Luukkainen',
		phone: '040-432342',
		street: 'Malminkaari 10 A',
		city: 'Helsinki',
		id: '3d599470-3436-11e9-bc57-8b80ba54c431',
	},
	{
		name: 'Venla Ruuska',
		street: 'Nallemäentie 22 C',
		city: 'Helsinki',
		id: '3d599471-3436-11e9-bc57-8b80ba54c431',
	},
];
const resolvers = {
	Query: {
		personCount: () => persons.length,
		allPersons: (root, args) => {
			if (!args.phone) {
				return persons;
			}
			const byPhone = person =>
				args.phone === 'YES' ? person.phone : !person.phone;
			return persons.filter(byPhone);
		},
		findPerson: (root, args) => persons.find(p => p.name === args.name),
	},
	Person: {
		address: ({ street, city }) => {
			return {
				street,
				city,
			};
		},
	},
	Mutation: {
		addPerson: (root, args) => {
			if (persons.find(p => p.name === args.name)) {
				throw new GraphQLError('Name must be unique', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.name,
					},
				});
			}
			const person = { ...args, id: uuid() };
			persons = persons.concat(person);
			return person;
		},
		editNumber: (root, args) => {
			const person = persons.find(p => p.name === args.name);
			if (!person) {
				return null;
			}

			const updatedPerson = { ...person, phone: args.phone };
			persons = persons.map(p => (p.name === args.name ? updatedPerson : p));
			return updatedPerson;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
 * 
 */
