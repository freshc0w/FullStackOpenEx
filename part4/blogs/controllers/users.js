const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
	const users = await User.find({}).populate('blogs', {
		title: 1,
		author: 1,
		url: 1,
		likes: 1,
	});
	res.json(users);
});

// returns true if input chars is more or equal to 3
const validInput = (input) => {
	return input.length >= 3;
}

usersRouter.post('/', async (req, res) => {
	const { username, name, password } = req.body;
	
	// Both username and password must be at least 3 chars long.
	if(!validInput(username)) {
		return res.status(400).json({
			error: 'username must be more than 3 chars long'
		})
	} else if(!validInput(password)) {
		return res.status(400).json({
			error: 'password must be more than 3 chars long'
		})
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		username,
		name,
		passwordHash,
	});

	const savedUser = await user.save();

	res.status(201).json(savedUser);
});

module.exports = usersRouter;
