import { useState, useEffect } from 'react';
import { Diary, NewDiary } from './types';
import { getAllDiaries, createDiary } from './diaryService';

const DiaryEntry = ({ date, weather, visibility, comment }: NewDiary) => {
	return (
		<>
			<h2>{date}</h2>
			<p>
				<strong>Visibility:</strong> {visibility}
			</p>
			<p>
				<strong>Weather:</strong> {weather}
			</p>
			<p>
				<strong>Comment:</strong> {`"${comment}"`}
			</p>
		</>
	);
};

const App = () => {
	const [diaries, setDiaries] = useState<Diary[]>([]);
	const [notification, setNotification] = useState('');

	// inputs
	const [date, setDate] = useState('');
	const [visibility, setVisibility] = useState('');
	const [weather, setWeather] = useState('');
	const [comment, setComment] = useState('');

	useEffect(() => {
		getAllDiaries().then(data => {
			setDiaries(data);
		});
	}, []);

	const diaryCreation = (event: React.SyntheticEvent) => {
		event.preventDefault();

		try {
			createDiary({ date, visibility, weather, comment }).then(data => {
				setDiaries(diaries.concat(data as Diary));
			});
			// Reset all input values
			[setDate, setVisibility, setWeather, setComment].forEach(fn => fn(''));
		} catch (error) {
			console.log('error');
			let errorMsg = 'Something went wrong..';
			if (error instanceof Error) {
				errorMsg += `Error: ${error.message}`;
			}
			setNotification(errorMsg);
			setTimeout(() => {
				setNotification('');
			}, 5000);
		}
	};

	const generateId = () => {
		return Math.floor(Math.random() * 100000);
	};

	return (
		<div>
			<h2 style={{ color: 'red' }}>{notification}</h2>
			<form onSubmit={diaryCreation}>
				<div>
					date
					<input
						type="date"
						value={date}
						onChange={({ target }) => setDate(target.value)}
					/>
				</div>
				<div>
					visibility:{' '}
					{['great', 'good', 'ok', 'poor'].map(status => (
						<div key={generateId()}>
							<label htmlFor={status}></label>
							{status}
							<input
								type="radio"
								name="visibility"
								id={status}
								value={status}
								onChange={({ target }) => setVisibility(target.value)}
							/>
						</div>
					))}
				</div>
				<div>
					weather:{' '}
					{['rainy', 'sunny', 'cloudy', 'stormy', 'windy'].map(status => (
						<label
							key={generateId()}
							htmlFor={status}
						>
							{status}
							<input
								type="radio"
								name="weather"
								id={status}
								value={status}
								onChange={({ target }) => setWeather(target.value)}
							/>
						</label>
					))}
				</div>
				<div>
					comment
					<input
						type="text"
						value={comment}
						onChange={({ target }) => setComment(target.value)}
					/>
				</div>
				<button type="submit">add</button>
			</form>
			<h2>Diary Entries</h2>
			<ul>
				{diaries.map(diary => (
					<DiaryEntry
						key={diary.id}
						date={diary.date}
						weather={diary.weather}
						visibility={diary.visibility}
						comment={diary.comment}
					/>
				))}
			</ul>
		</div>
	);
};

export default App;
