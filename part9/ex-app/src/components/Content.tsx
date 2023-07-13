import { CourseParts } from '../App';
import Part from './Part';

export interface CourseList {
	courseParts: CourseParts[];
}

const Content = ({ courseParts }: CourseList) => {
	return (
		<div>
			{courseParts.map((part, idx) => (
				<Part key={idx} coursePart={part} />
			))}
		</div>
	);
};

export default Content;
// const Content = (props: TotalValue) => {
// 	return (
// 		<>
// 			<p>
// 				{props.courseParts[0].name} {props.courseParts[0].exerciseCount}
// 			</p>
// 			<p>
// 				{props.courseParts[1].name} {props.courseParts[1].exerciseCount}
// 			</p>
// 			<p>
// 				{props.courseParts[2].name} {props.courseParts[2].exerciseCount}
// 			</p>
// 		</>
// 	);
// };
