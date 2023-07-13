import { NewPatientEntry, Gender } from './types';

// type guards
const isString = (text: unknown): text is string =>
	typeof text === 'string' || text instanceof String;

const parseStrInfo = (info: unknown): string => {
	if (!info || !isString(info)) throw new Error('Incorrect or missing info');
	return info;
};

const isGender = (param: string): param is Gender =>
	Object.values(Gender)
		.map(v => v.toString())
		.includes(param);

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isString(gender) || !isGender(gender))
		throw new Error('Incorrect or missing gender' + gender);

	return gender;
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
	if (!object || typeof object !== 'object')
		throw new Error('Incorrect or missing data');

	if (
		'name' in object &&
		'dateOfBirth' in object &&
		'ssn' in object &&
		'gender' in object &&
		'occupation' in object
	) {
		const newEntry: NewPatientEntry = {
			name: parseStrInfo(object.name),
			dateOfBirth: parseStrInfo(object.dateOfBirth),
			ssn: parseStrInfo(object.ssn),
			gender: parseGender(object.gender),
			occupation: parseStrInfo(object.occupation),
		};
		return newEntry;
	}
	throw new Error('Incorrect data: Some fields are missing');
};

export default toNewPatientEntry;
