import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';
// import { Patient, Entry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
	const id = req.params.id;
	const entry = patientService.findPatientWithEntriesById(id);
	return res.send(entry);
});

router.post('/', (req, res) => {
	try {
		const newPatientEntry = toNewPatientEntry(req.body);

		const addedEntry = patientService.addPatient(newPatientEntry);
		res.json(addedEntry);
		console.log('added', addedEntry);
	} catch (error: unknown) {
		let errorMsg = 'Something went wrong';
		if (error instanceof Error) {
			errorMsg += `Error: ${error.message}`;
		}
		res.status(400).send(errorMsg);
	}
});

export default router;
