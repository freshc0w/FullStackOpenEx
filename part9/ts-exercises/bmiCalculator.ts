interface CalculateValues {
	value1: number;
	value2: number;
}

const parseArguments = (
	args: string[],
	allowedLength: number
): CalculateValues => {
	if (args.length < allowedLength + 1) throw new Error('Not enough arguments');
	if (args.length > allowedLength + 1) throw new Error('Too many arguments');

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			value1: Number(args[2]),
			value2: Number(args[3]),
		};
	} else {
    throw new Error('Provided values were not numbers!')
  }
};

// BMI = mass / h^2
export const calculateBmi = (height: number, mass: number): string => {
	const bmi = mass / (height / 100) ** 2;
	console.log(`BMI is: ${bmi}`);
	if (bmi < 16) {
		return 'Underweight (severe thinness)';
	} else if (bmi < 16.9) {
		return 'Underweight (moderate thinness)';
	} else if (bmi < 18.4) {
		return 'Underweight (mild thinness)';
	} else if (bmi < 24.9) {
		return 'Normal (healthy range)';
	} else if (bmi < 29.9) {
		return 'Overweight (Pre-Obese)';
	} else if (bmi < 34.9) {
		return 'Obese (Class I)';
	} else if (bmi < 39.9) {
		return 'Obese (Class II)';
	} else {
		return 'Obese (Class III)';
	}
};

try {
  const { value1, value2 } = parseArguments(process.argv, 3);
  console.log(calculateBmi(
    value1,
    value2
  ))
} catch(error: unknown) {
  let errorMessage = 'Something bad occured: '
  if(error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

// console.log(calculateBmi(180, 74));
