const Header = (props) => {
    console.log(props);
	return <h1>{props.course}</h1>;
};

const Part = (props) => {
    return <p>{props.part} {props.exercises}</p>
}

const Content = ({ partNum, exerciseNum }) => {
	return (
		<div>
            <Part part={[...partNum][0]} exercises={[...exerciseNum][0]} />
            <Part part={[...partNum][1]} exercises={[...exerciseNum][1]} />
            <Part part={[...partNum][2]} exercises={[...exerciseNum][2]} />
        </div>
	);
};


const Total = (props) => <p>Number of exercises {props.totalNum} </p>;

function App() {
	const course = "Half Stack application development";
	const part1 = "Fundamentals of React";
	const exercises1 = 10;
	const part2 = "Using props to pass data";
	const exercises2 = 7;
	const part3 = "State of a component";
	const exercises3 = 16;
    const partNum = [part1, part2, part3];
    const exerciseNum = [exercises1, exercises2, exercises3];

	return (
		<>
			<Header course={course} />
            {/* <Content part={part1} exercise={exercises1}/>
			<Content part={part2} exercise={exercises2}/>
			<Content part={part3} exercise={exercises3}/> */}
            <Content partNum={partNum} exerciseNum={exerciseNum}/>
			<Total totalNum={exercises1 + exercises2 + exercises3} />
		</>
	);
}

export default App;
