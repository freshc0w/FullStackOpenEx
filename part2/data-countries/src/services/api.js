import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAllCountries = () => {
	const request = axios.get(`${baseUrl}/all`);
	return request.then(resp => resp.data);
};

const getCountry = (name) => {
    console.log(`${baseUrl}/name/${name}`);
	const request = axios.get(`${baseUrl}/name/${name}`);
	return request.then(resp => resp.data);
};

export default { getAllCountries, getCountry };
