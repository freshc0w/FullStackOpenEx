import patientsData from '../../data/patients';
import { PatientEntry, NonSensitivePatientEntry } from '../types';

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

export default {
	getEntries,
	getNonSensitiveEntries,
};
