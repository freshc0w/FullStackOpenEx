import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('renders blog title and author, but does not render url or number of like by default', () => {
	const blog = {
		title: 'Blog renders title and author',
		author: 'Freshc0w',
		url: 'http://example.com',
		likes: 2,
	};

	render(<Blog blog={blog} />);
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
