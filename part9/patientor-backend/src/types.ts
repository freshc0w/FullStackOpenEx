export interface DiagnoseEntry {
	code: string;
	name: string;
	latin?: string;
}

export type Diagnose = {
	code: string;
	name: string;
	latin?: string;
};

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export interface PatientEntry {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
}

export type NonSensitivePatientEntry = Pick<
	PatientEntry,
	'id' | 'name' | 'dateOfBirth' | 'gender' | 'occupation'
>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export interface Entry {}

export interface Patient {
	id: string;
	name: string;
	ssn: string;
	occupation: string;
	gender: Gender;
	dateOfBirth: string;
	entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

// export type Diagnose = Pick<DiagnoseEntry, 'code' | 'name'>[];
