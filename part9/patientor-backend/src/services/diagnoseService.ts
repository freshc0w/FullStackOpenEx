import diagnosesData from '../../data/diagnoses';

import { DiagnoseEntry, Diagnose } from '../types';

const getEntries = (): DiagnoseEntry[] => {
	return diagnosesData;
};

const getDiagnoseEntries = (): Diagnose[] => {
	return diagnosesData.map(({ code, name, latin }) => ({
		code,
		name,
		latin,
	}));
};

export default { getEntries, getDiagnoseEntries };
