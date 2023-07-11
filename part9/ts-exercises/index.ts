import express from 'express';
import { calculateBmi } from './bmiCalculator';
// import qs from 'qs';
const app = express();

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
	if (
		!req.query['height'] ||
		!req.query['weight'] ||
		isNaN(Number(req.query['height'])) ||
		isNaN(Number(req.query['weight']))
	)
		return res.status(400).json({ error: 'malformatted parameters' });

	const info = {
		height: Number(req.query['height']),
		weight: Number(req.query['weight']),
	};
	return res.json({
		...info,
		bmi: calculateBmi(info.height, info.weight),
	});
});

const PORT = 3004;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
