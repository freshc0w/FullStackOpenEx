// BMI = mass / h^2

const calculateBmi = (height: number, mass: number): string => {
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

console.log(calculateBmi(180, 74));
