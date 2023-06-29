import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Note from './Note';

test('renders content', () => {
	const note = {
		content: 'Component testing is done with react-testing-library',
		important: true,
	};

	// Main way
	render(<Note note={note} />);

	const element = screen.getByText(
		'Component testing is done with react-testing-library',
		{ exact: false }
	);

	// If we wanna find the element that contains the text, use findByText. getByText is exact
	// const element = await screen.findByText(
	//     'Component testing is done with react-testing-library'
	// )

	screen.debug(element);
	// Can also just do screen.debug() to see whole screen
	// alternative way
	// const { container } = render(<Note note={note} />)

	// const div = container.querySelector('.note')
	// expect(div).toHaveTextContent(
	//     'Component testing is done with react-testing-library'
	// )

	// Not needed at all:
	expect(element).toBeDefined();
});

test('clicking the button calls event handler once', async () => {
	const note = {
		content: 'Component testing is done with react-testing-library',
		important: true,
	};

	const mockHandler = jest.fn();

	render(
		<Note
			note={note}
			toggleImportance={mockHandler}
		/>
	);

	const user = userEvent.setup();
	const button = screen.getByText('make not important');
	await user.click(button);

	expect(mockHandler.mock.calls).toHaveLength(1);
});


test('does not render this', () => {
    const note = {
        content: 'This is a reminder',
        important: true,
    }

    render(<Note note={note} />)

    const element = screen.queryByText('do not want this thing to be rendered')
    expect(element).toBeNull();
})