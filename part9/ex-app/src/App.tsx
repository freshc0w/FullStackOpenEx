import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

interface CoursePartBase {
	name: string;
	exerciseCount: number;
}

interface CoursePartDesc extends CoursePartBase {
	description: string;
}

interface CoursePartBasic extends CoursePartDesc {
	kind: 'basic';
}
interface CoursePartGroup extends CoursePartBase {
	groupProjectCount: number;
	kind: 'group';
}
interface CoursePartBackground extends CoursePartDesc {
	backgroundMaterial: string;
	kind: 'background';
}

interface CoursePartSpecial extends CoursePartDesc {
	requirements: String[];
	kind: 'special';
}

export type CourseParts =
	| CoursePartBasic
	| CoursePartGroup
	| CoursePartBackground
	| CoursePartSpecial;

export const courseParts: CourseParts[] = [
	{
		name: 'Fundamentals',
		exerciseCount: 10,
		description: 'This is an awesome course part',
		kind: 'basic',
	},
	{
		name: 'Using props to pass data',
		exerciseCount: 7,
		groupProjectCount: 3,
		kind: 'group',
	},
	{
		name: 'Basics of type Narrowing',
		exerciseCount: 7,
		description: 'How to go from unknown to string',
		kind: 'basic',
	},
	{
		name: 'Deeper type usage',
		exerciseCount: 14,
		description: 'Confusing description',
		backgroundMaterial:
			'https://type-level-typescript.com/template-literal-types',
		kind: 'background',
	},
	{
		name: 'TypeScript in frontend',
		exerciseCount: 10,
		description: 'a hard part',
		kind: 'basic',
	},
	{
		name: 'Backend Development',
		exerciseCount: 21,
		description: 'Typing the backend',
		requirements: ['nodejs', 'jest'],
		kind: 'special',
	},
];

const App = () => {
	const courseName = 'Half Stack application development';

	return (
		<div>
			<Header name={courseName} />
			<Content courseParts={courseParts} />
			Number of exercises
			<Total courseParts={courseParts} />
		</div>
	);
};

export default App;
