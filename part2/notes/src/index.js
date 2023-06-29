import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import './index.css';

// axios.get("http://localhost:3001/notes").then((resp) => {
// 	const notes = resp.data;
// 	ReactDOM.createRoot(document.getElementById("root")).render(
// 		<App notes={notes} />
// 	);
// });

ReactDOM.createRoot(document.getElementById('root')).render(
	<App />
)