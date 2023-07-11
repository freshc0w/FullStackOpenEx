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

export interface PatientEntry {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: string;
	occupation: string;
}

export type NonSensitivePatientEntry = Pick<
	PatientEntry,
	'id' | 'name' | 'dateOfBirth' | 'gender' | 'occupation'
>;

// export type Diagnose = Pick<DiagnoseEntry, 'code' | 'name'>[];
