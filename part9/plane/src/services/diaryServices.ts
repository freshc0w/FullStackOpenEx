import diaries from '../../data/diaries';

import {
	DiaryEntry,
	NonSensitiveDiaryEntry,
	NewDiaryEntry,
} from '../types';

// try and prevent type assertion where possible
// const diaries: DiaryEntry[] = diaryData as DiaryEntry[]; //type assertion

const getEntries = (): DiaryEntry[] => {
	return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
	// need to do this to avoid leaking unwanted fields to the requesting browser.
	return diaries.map(({ id, date, weather, visibility }) => ({
		id,
		date,
		weather,
		visibility,
	}));
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
	const newDiaryEntry = {
		id: Math.max(...diaries.map(d => d.id)) + 1,
		...entry
	};
	diaries.push(newDiaryEntry);
	return newDiaryEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
	const entry = diaries.find(d => d.id === id);
	return entry;
};

export default {
	getEntries,
	getNonSensitiveEntries,
	addDiary,
	findById,
};
