import axios from 'axios';
const baseUrl = '/api/login';

const login = async credientials => {
	const response = await axios.post(baseUrl, credientials);
    console.log(response, response.data)
	return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { login };
