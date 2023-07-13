import express from 'express';
import diaryServices from '../services/diaryServices';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(diaryServices.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
	const diary = diaryServices.findById(Number(req.params.id));

	diary ? res.send(diary) : res.sendStatus(404);
});

router.post('/', (req, res) => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const newDiaryEntry = toNewDiaryEntry(req.body);

		const addedEntry = diaryServices.addDiary(newDiaryEntry);
		res.json(addedEntry);
	} catch (error: unknown) {
		let errorMsg = 'Something went wrong';
		if(error instanceof Error) {
			errorMsg += 'Error: ' + error.message;
		}
		res.status(400).send(errorMsg);
	}
});

export default router;
