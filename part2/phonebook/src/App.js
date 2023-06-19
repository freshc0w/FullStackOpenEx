import { useState } from "react";
import axios from 'axios';


// Creation of components
const Filter = ({ inputValue, handleInputChange }) => (
	<>
		Filter shown with:{" "}
		<input value={inputValue} onChange={handleInputChange}></input>
	</>
);

const PersonForm = (props) => {
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
				name: <input value={newName} onChange={handleNameChange} />
			</div>
			<div>
				number:{" "}
				<input value={newNumber} onChange={handleNumberChange} />
			</div>
			<div>
				<button type="submit" onClick={handleAddClick}>
					add
				</button>
			</div>
		</form>
	);
};

const PersonInfo = ({ person }) => (
	<li>
		{person.name} {person.number}
	</li>
);

const Persons = ({ filteredInput, showAllFnc, showFilteredFnc }) => {
	return <ul>{!filteredInput ? showAllFnc() : showFilteredFnc()}</ul>;
};

const App = () => { 
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
		{ name: "Chia-Chuan-Tsou", number: "39-23-6423322", id: 5 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filteredInput, setFilteredInput] = useState("");

	const handleNameChange = (e) => {
		setNewName(e.target.value);
	};

	const handleNumberChange = (e) => {
		setNewNumber(e.target.value);
	};

	const hasExistingName = () =>
		persons.some((person) => person.name === newName);

	const handleAddClick = (e) => {
		e.preventDefault();

		if (hasExistingName()) {
			alert(`${newName} is already added to phonebook`);
			return;
		}
		const newPersonObj = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};

		setPersons([...persons, newPersonObj]);
		setNewName("");
		setNewNumber("");
	};

	// Input that filters out the list of names by their input name.
	const handleFilteredInput = (e) => {
		setFilteredInput(e.target.value);
	};

	// Show all phonebook name and numbers based if the fitlered input is empty or not.

	const showAll = () =>
		persons.map((person) => <PersonInfo key={person.id} person={person} />);

	const showFiltered = () => {
		return persons
			.filter((person) =>
				person.name.toLowerCase().includes(filteredInput.toLowerCase())
			)
			.map((p) => <PersonInfo key={p.id} person={p} />);
	};

	return (
		<div>
			<h2>Phonebook</h2>
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
