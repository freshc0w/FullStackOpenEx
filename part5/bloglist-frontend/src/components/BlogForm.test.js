import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
	const createBlog = jest.fn();
	const user = userEvent.setup();

	const { container } = render(<BlogForm createBlog={createBlog} />);

    const inputs = screen.getAllByRole('textbox');
    const sendBtn = screen.getByText('Create');

    await user.type(inputs[0], 'blog title')
    await user.type(inputs[1], 'blog author')
    await user.type(inputs[2], 'blog url')
    await user.click(sendBtn);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe('blog title');
    expect(createBlog.mock.calls[0][0].author).toBe('blog author');
    expect(createBlog.mock.calls[0][0].url).toBe('blog url');
});
