export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry {
	id: number;
	date: string;
	weather: Weather;
	visibility: Visibility;
	// ?: means optional
	comment?: string;
}

// Can also use Pick. Omit is the opposite
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
