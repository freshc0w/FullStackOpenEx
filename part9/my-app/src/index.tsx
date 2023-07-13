import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PropTypes from 'prop-types';
import reportWebVitals from './reportWebVitals';

interface WelcomeProps {
	name: string;
}

const Welcome = (props: WelcomeProps) => (
	<h1>Hello, {props.name}</h1>
);

Welcome.propTypes = {
	name: PropTypes.string,
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Welcome name="Sarah" />
);

// const root = ReactDOM.createRoot(
// 	document.getElementById('root') as HTMLElement
// );

// root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
