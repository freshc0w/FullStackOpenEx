import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import NoteForm from './NoteForm';

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
	const createNote = jest.fn();
	const user = userEvent.setup();

	const { container } = render(<NoteForm createNote={createNote} />);

	// Selecting it through querySelector
	// const input = container.querySelector('#note-input');

	// Selecting it by role:
	// const input = screen.getByRole('textbox');
	// If there are multiple inputs, do:
	// const inputs = screen.getAllByRole('textbox')
	// await user.type(inputs[0], 'testing a form...)

	// If placeholder:
	const input = screen.getByPlaceholderText('write note content here');
	const sendButton = screen.getByText('save');

	await user.type(input, 'testing a form...');
	await user.click(sendButton);

	expect(createNote.mock.calls).toHaveLength(1);
	expect(createNote.mock.calls[0][0].content).toBe('testing a form...');
});
