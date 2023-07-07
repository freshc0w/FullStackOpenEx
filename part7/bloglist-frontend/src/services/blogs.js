import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
	token = `Bearer ${newToken}`;
};

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then(response => response.data);
};

const create = async newObject => {
	// config authorization based on token
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.post(baseUrl, newObject, config);
	return response.data;
};

const update = async (id, newObject) => {
	const response = await axios.put(`${baseUrl}/${id}`, newObject);
	return response.data;
};

const removeBlog = async id => {
	// config authorization based on token
	const config = {
		headers: { Authorization: token },
	};
	const response = await axios.delete(`${baseUrl}/${id}`, config);
	return response.data;
};

const appendComment = async (id, content) => {
	const blogs = await getAll();
	const blog = blogs.find(b => b.id === id);

	const response = await axios.post(`${baseUrl}/${id}/comments`, {
		...blog,
		content,
	});
	return response.data;
};

export default { getAll, create, setToken, update, removeBlog, appendComment };
