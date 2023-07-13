// export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

// export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export enum Weather {
	Sunny = 'sunny',
	Rainy = 'rainy',
	Cloudy = 'cloudy',
	Stormy = 'stormy',
	Windy = 'windy',
}

export enum Visibility {
	Great = 'great',
	Good = 'good',
	Ok = 'ok',
	Poor = 'poor',
}

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
// If pick is used it would be:
// export type NonSensitiveDiaryEntry = Pick<DiaryEntry, 'visibility' | 'weather' | 'date' | 'id'

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;
