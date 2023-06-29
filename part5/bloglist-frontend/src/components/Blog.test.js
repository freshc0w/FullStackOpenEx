import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Togglable />', () => {
	let container;
    const mockHandler = jest.fn();
	beforeEach(() => {
		const blog = {
			title: 'Blog renders title and author',
			author: 'Freshc0w',
			url: 'http://example.com',
			likes: 2,
		};
		container = render(<Blog blog={blog} handleUpdateBlog={mockHandler} />).container;
	});

	test('renders blog title and author, but does not render url or number of like by default', () => {
		const titleElement = screen.getByText('Blog renders title and author', {
			exact: false,
		});
		const authorElement = screen.getByText('Freshc0w', { exact: false });
		const urlElement = screen.queryByText('http://example.com');
		const likesElement = screen.queryByText('2');
		expect(titleElement).toBeDefined();
		expect(authorElement).toBeDefined();
		expect(urlElement).toBeNull();
		expect(likesElement).toBeNull();
	});

	test('at start, children are not displayed', async () => {
		const div = container.querySelector('.togglableContent');
		expect(div).toHaveStyle('display: none');
	});

	test('after clicking button, children are displayed', async () => {
		const user = userEvent.setup();
		const button = screen.getByText('view');
		await user.click(button);

		const div = container.querySelector('.togglableContent');
		expect(div).not.toHaveStyle('display: none');
	});

    test('If like button is clicked twice, the event handler of the component is called twice', async () => {
        const btn = container.querySelector('.likeBtn')
        expect(btn).toBeDefined()
        const user = userEvent.setup();
        await user.click(btn);
        await user.click(btn);

        expect(mockHandler.mock.calls).toHaveLength(2);
    })
});
