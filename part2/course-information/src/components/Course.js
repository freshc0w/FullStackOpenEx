const Course = ({ course }) => {
	const total = course.parts.reduce((acc, val) => acc + val.exercises, 0);

	return (
		<>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total sum={total} />
		</>
	);
};

const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => (
	<p>
		<strong>Number of exercises: {sum}</strong>
	</p>
);

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);

const Content = ({ parts }) => (
	<>
		{parts.map((part) => (
			<Part key={part.id} part={part} />
		))}
	</>
);

export default Course;