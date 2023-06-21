import { useState, useEffect } from 'react';
import axios from 'axios';
import phoneServices from './services/phones';
import Notification from './components/Notification';

// Creation of components
const Filter = ({ inputValue, handleInputChange }) => (
	<>
		Filter shown with:{' '}
		<input
			value={inputValue}
			onChange={handleInputChange}
		></input>
	</>
);

const PersonForm = props => {
	const {
		newName,
		handleNameChange,
		newNumber,
		handleNumberChange,
		handleAddClick,
	} = props;

	return (
		<form>
			<div>
				name:{' '}
				<input
					value={newName}
					onChange={handleNameChange}
				/>
			</div>
			<div>
				number:{' '}
				<input
					value={newNumber}
					onChange={handleNumberChange}
				/>
			</div>
			<div>
				<button
					type="submit"
					onClick={handleAddClick}
				>
					add
				</button>
			</div>
		</form>
	);
};

const PersonInfo = ({ person, handleRemoveClick }) => (
	<li>
		{person.name} {person.number}
		<button onClick={handleRemoveClick}>remove</button>
	</li>
);

const Persons = ({ filteredInput, showAllFnc, showFilteredFnc }) => {
	return <ul>{!filteredInput ? showAllFnc() : showFilteredFnc()}</ul>;
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filteredInput, setFilteredInput] = useState('');
	const [notifMessage, setNotifMessage] = useState('test');
	const [notifStatus, setNotifStatus] = useState(true); // returns true if success, false otherwise (error);

	// Get all persons data (name and number);
	useEffect(() => {
		phoneServices.getAll().then(initialData => {
			setPersons(initialData);
		});
	}, []);

	const handleNameChange = e => {
		setNewName(e.target.value);
	};

	const handleNumberChange = e => {
		setNewNumber(e.target.value);
	};

	const hasExistingName = () =>
		persons.some(person => person.name === newName);

	// ADDING INFORMATION TO THE PHONE BOOK
	const handleAddClick = e => {
		e.preventDefault();

		const updatePersonNumber = () => {
			const targetPerson = persons.find(p => p.name === newName);
			const changedPerson = { ...targetPerson, number: newNumber };

			phoneServices
				.update(targetPerson.id, changedPerson)
				.then(returnedPerson => {
					setPersons(
						persons.map(p =>
							p.id !== targetPerson.id ? p : returnedPerson
						)
					);

					// Update notification message for 5secs
					setNotifMessage(
						`updated ${newName}'s number to ${newNumber}`
					);
					setNotifStatus(true);
					setTimeout(() => {
						setNotifMessage('');
					}, 5000);
				})
				.catch(error => {
					// update lists of phonebook again (rerender)
					phoneServices.getAll().then(currentData => {
						setPersons(currentData);
					});

					// set error message and squash error.
					setNotifMessage(
						`Information of ${newName}has already been removed from the server`
					);
					setNotifStatus(false);
					setTimeout(() => {
						setNotifMessage('');
					}, 5000);
				});

			// reset all the input values
			setNewName('');
			setNewNumber('');
		};

		if (hasExistingName()) {
			window.confirm(
				`${newName} has already been added to phonebook, replace the old number with a new one?`
			) && updatePersonNumber();

			return;
		}

		const newPersonObj = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};

		phoneServices.create(newPersonObj).then(returnedPerson => {
			setPersons(persons.concat(returnedPerson));
			setNewName('');
			setNewNumber('');

			// update notification for 5 seconds.
			setNotifMessage(`added ${newPersonObj.name}`);
			setNotifStatus(true);
			setTimeout(() => {
				setNotifMessage('');
			}, 5000);
		});
	};

	// REMOVING INFORMATION FROM THE PHONE BOOK
	const handleRemove = id => {
		const personName = persons.find(p => p.id === id).name;

		window.confirm(`Remove ${personName} from the phonebook?`) &&
			phoneServices.removePerson(id).then(returnedPerson => {
				setPersons(persons.filter(p => p.id !== id));
			});
	};

	// Input that filters out the list of names by their input name.
	const handleFilteredInput = e => {
		setFilteredInput(e.target.value);
	};

	// Show all phonebook name and numbers based if the fitlered input is empty or not.

	const showAll = () =>
		persons.map(person => (
			<PersonInfo
				key={person.id}
				person={person}
				handleRemoveClick={() => {
					handleRemove(person.id);
				}}
			/>
		));

	const showFiltered = () => {
		return persons
			.filter(person =>
				person.name.toLowerCase().includes(filteredInput.toLowerCase())
			)
			.map(p => (
				<PersonInfo
					key={p.id}
					person={p}
					handleRemoveClick={() => {
						handleRemove(p.id);
					}}
				/>
			));
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification
				status={notifStatus}
				message={notifMessage}
			/>
			<Filter
				inputValue={filteredInput}
				handleInputChange={handleFilteredInput}
			/>

			<h2>add a new</h2>
			<PersonForm
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNumberChange={handleNumberChange}
				handleAddClick={handleAddClick}
			/>
			<h2>Numbers</h2>
			{/* <ul>{!filteredInput ? showAll() : showFiltered()}</ul> */}
			<Persons
				filteredInput={filteredInput}
				showAllFnc={showAll}
				showFilteredFnc={showFiltered}
			/>
		</div>
	);
};

export default App;
