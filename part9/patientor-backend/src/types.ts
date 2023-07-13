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

// export type Diagnose = Pick<DiagnoseEntry, 'code' | 'name'>[];
