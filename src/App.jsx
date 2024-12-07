import './App.css';
import React, { useState, Suspense } from 'react';
import Card from './components/Card.jsx';
import Form from './components/Form.jsx';
import Navbar from './components/Navbar.jsx';

// TODO: fix bug where previous card shows after closing error message
// TODO: add form validation (username cant be empty)

function App() {
	const [username, setUsername] = useState('');
	const [input, setInput] = useState('');
	const [showResult, setShowResult] = useState(false);

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	const handleClick = () => {
		setUsername(input);
		setShowResult(true);
	};

	return (
		<div className='content'>
			<Navbar />
			<Form onChange={handleChange} onClick={handleClick} />
			{showResult && <Card username={username} />}
		</div>
	);
}

export default App;
