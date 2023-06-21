import { useState, useEffect } from 'react';
import countriesServices from './services/api';

const Search = ({ countryName, handleInputChange }) => {
	return (
		<div>
			find countries
			<input
				type="text"
				value={countryName}
				onChange={handleInputChange}
			/>
		</div>
	);
};

const ResultList = ({ countries }) => {
	if (typeof countries === 'string') return <h2>{countries}</h2>;
	return (
		<ul>
			{countries.map(country => (
				<li key={country.id}>{country.name}</li>
			))}
		</ul>
	);
};

function App() {
	const [newCountryName, setNewCountryName] = useState('');
	const [currentCountries, setCurrentCountries] = useState(null);

	useEffect(() => {
		countriesServices.getAllCountries().then(returnedData => {
			const filteredCountries = returnedData
				.filter(c =>
					c.name.common
						.toLowerCase()
						.includes(newCountryName.toLowerCase())
				)
				.map(c => {
					return { name: c.name.common };
				});
			const resCountries = filteredCountries.map(c => {
				return { ...c, id: filteredCountries.indexOf(c) + 1 };
			});

			resCountries.length > 10
				? setCurrentCountries(
						'Too many matches (more than 10), specify another filter'
				  )
				: setCurrentCountries(resCountries);
		});
	}, [newCountryName]);

	const handleCountryChange = e => {
		setNewCountryName(e.target.value);
	};

	return (
		<div>
			<Search
				countryName={newCountryName}
				handleInputChange={handleCountryChange}
			/>
			{!newCountryName ? (
				'Search for a country using the provided search bar above'
			) : (
				<ResultList countries={currentCountries} />
			)}
		</div>
	);
}

export default App;
