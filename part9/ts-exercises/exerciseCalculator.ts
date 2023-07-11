export interface Description {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

interface ExerciseValues {
	days: number[];
	target: number;
}

const configureArguments = (args: string[]): ExerciseValues => {
	const lastElem = args.at(2);
	const days = args
		.slice(3, args.length)
		.map(num => (!isNaN(Number(num)) ? Number(num) : undefined));
	const target = !isNaN(Number(lastElem)) ? Number(lastElem) : undefined;

	if (!days.includes(undefined) || target !== undefined) {
		return {
			days,
			target,
		};
	}
	throw new Error('Provided values were not numbers!');
};

export const calculateExercises = (
	dailyHours: number[],
	target: number
): Description => {
	const average =
		dailyHours.reduce((acc, val) => acc + val, 0) / dailyHours.length;

	let rating, ratingDescription;
	if (average < 0.5 * target) {
		rating = 1;
		ratingDescription = 'Terrible performance';
	} else if (
		average < 0.75 * target ||
		(average > 0.75 * target && average < target)
	) {
		rating = 2;
		ratingDescription = 'Not bad almost there';
	} else if (average >= target && average < 1.5) {
		rating = 3;
		ratingDescription = 'You reached your goal!';
	} else if (average >= target * 1.5) {
		rating = 5;
		ratingDescription = 'Congrats you outperformed your goal';
	} else if (average >= target * 1.25) {
		ratingDescription = 'INCREDIBLE PERORMANCE';
		rating = 4;
	}

	return {
		periodLength: dailyHours.length,
		trainingDays: dailyHours.filter(day => day >= 1).length,
		success: average / dailyHours.length >= target,
		rating,
		ratingDescription,
		target,
		average,
	};
};

try {
	const { days, target } = configureArguments(process.argv);
	console.log(calculateExercises(days, target));
} catch (error: unknown) {
	let errorMessage = 'Something bad happened: ';
	if (error instanceof Error) errorMessage += error.message;
	console.log(errorMessage);
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
