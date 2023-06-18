import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 1 }]);
	const [newName, setNewName] = useState("");

	const handleNameChange = (e) => {
		setNewName(e.target.value);
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
			id: persons.length + 1,
		};

		setPersons([...persons, newPersonObj]);
		setNewName("");
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					<button type="submit" onClick={handleAddClick}>
						add
					</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{persons.map((person) => {
					return <li key={person.id}>{person.name}</li>;
				})}
			</ul>
		</div>
	);
};

export default App;
