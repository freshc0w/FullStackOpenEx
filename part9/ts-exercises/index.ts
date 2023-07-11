import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { Description, calculateExercises } from './exerciseCalculator';
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

app.post('/exercises', (req, res) => {
	const { dailyExercises, target } = req.body;

	// validation
	if (!dailyExercises || !target)
		return res.status(400).send({ error: 'parameters missing' });

	if (!Array.isArray(dailyExercises) || isNaN(Number(target)))
		return res.status(400).send({ error: 'malformatted parameters' });

	const result = calculateExercises(dailyExercises, Number(target));
	return res.send({ result });
});

const PORT = 3004;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
