import { useState } from "react";

const NoteForm = ({ onSubmit, handleChange, value }) => {
	return (
		<div>
			<h2>Create a new note</h2>

			<form onSubmit={onSubmit}>
				<input
					type="text"
					value={value}
					onChange={handleChange}
				/>
			</form>
			<button type="submit">save</button>
		</div>
	);
};

export default NoteForm;
