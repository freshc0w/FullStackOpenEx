import diaries from '../../data/diaries';

import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

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

const addDiary = () => {
	return null;
};

export default {
	getEntries,
	getNonSensitiveEntries,
	addDiary,
};
