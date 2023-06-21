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

const ResultList = ({ countries, handleClick }) => {
	if (typeof countries === 'string') return <h2>{countries}</h2>;
	return (
		<ul>
			{countries.map(country => (
				<li key={country.id}>
					{country.name}{' '}
					<button onClick={() => handleClick(country.name)}>
						Show
					</button>
				</li>
			))}
		</ul>
	);
};

const CountryInfo = ({ country }) => {
	console.log(country);

	return (
		<div>
			<h1>{country.name}</h1>
			<p>Capital: {country.capital}</p>
			<p>Area: {country.area}</p>

			<h3>Languages</h3>
			<ul>
				{country.languages.map((lang, idx) => (
					<li key={idx + 1}>{lang}</li>
				))}
			</ul>

			<img
				src={country.flag}
				alt="country flag"
			/>
		</div>
	);
};

function App() {
	const [newCountryName, setNewCountryName] = useState('');
	const [currentCountries, setCurrentCountries] = useState(null);
	const [currentCountryInfo, setCurrentCountryInfo] = useState(null);

	useEffect(() => {
		// Make sure to set the display current country info to false
		setCurrentCountryInfo(null);

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

	const handleClick = cName => {
		console.log(cName);
		countriesServices.getCountry(cName).then(returnedInfo => {
			const countryObj = {
				name: cName,
				capital: returnedInfo.capital[0] || 'no capital',
				area: returnedInfo.area,
				languages: Object.values(returnedInfo.languages),
				flag: returnedInfo.flags.png,
			};
			setCurrentCountryInfo(countryObj);
		});
	};

	return (
		<div>
			<Search
				countryName={newCountryName}
				handleInputChange={handleCountryChange}
			/>
			{!newCountryName ? (
				'Search for a country using the provided search bar above'
			) : !currentCountryInfo ? (
				<ResultList
					countries={currentCountries}
					handleClick={handleClick}
				/>
			) : (
				<CountryInfo country={currentCountryInfo} />
			)}
		</div>
	);
}

export default App;
