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

// export interface Entry {}

export interface Patient {
	id: string;
	name: string;
	ssn: string;
	occupation: string;
	gender: Gender;
	dateOfBirth: string;
	entries: Entry[]; // refer below
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

// export type Diagnose = Pick<DiagnoseEntry, 'code' | 'name'>[];

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3,
}

interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck';
	healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: 'OccupationalHealthcare';
	sickLeave?: {
		startDate: string;
		endDate: string;
	};
	employerName: string;
}

interface HospitalEntry extends BaseEntry {
	type: 'Hospital';
	discharge: {
		date: string;
		criteria: string;
	};
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;
