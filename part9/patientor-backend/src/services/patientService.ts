import patientsData from '../../data/patients';
import patients from '../../data/patients-full';

import {
	PatientEntry,
	NonSensitivePatientEntry,
	NewPatientEntry,
	Patient
} from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): PatientEntry[] => {
	return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
	return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addPatient = (entry: NewPatientEntry): PatientEntry | undefined => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
	const id: string = uuid();

	const newPatientEntry = {
		id,
		...entry,
	};
	patientsData.push(newPatientEntry);
	return newPatientEntry;
};

const findPatientById = (id: string): PatientEntry | undefined => {
	const entry = patientsData.find(p => p.id === id);
	return entry;
};


const getPatientsWithEntries = (): Patient[] => {
	return patients;
};

const findPatientWithEntriesById = (id: string): Patient | undefined => {
	const entry = patients.find(p => p.id === id);
	return entry;
};

export default {
	getEntries,
	getNonSensitiveEntries,
	addPatient,
	findPatientById,
	getPatientsWithEntries,
	findPatientWithEntriesById
};
