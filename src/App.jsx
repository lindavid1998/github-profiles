import './App.css';
import React, { useState, useEffect, Suspense } from 'react';
import Card from './components/Card.jsx';
import Form from './components/Form.jsx';
import Navbar from './components/Navbar.jsx';
import Button from './components/Button.jsx';
// TODO: fix bug where previous card shows after closing error message
// TODO: add form validation (username cant be empty)

function App() {
	const [username, setUsername] = useState('');
	const [input, setInput] = useState('');
	const [showResult, setShowResult] = useState(false);
	// const [theme, setTheme] = useState('dark')

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	const handleClick = () => {
		setUsername(input);
		setShowResult(true);
	};

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', 'dark');
	}, []);

	const toggleTheme = () => {
		const current = document.documentElement.getAttribute('data-theme');
		if (current == 'dark') {
			document.documentElement.setAttribute('data-theme', 'light');
		} else {
			document.documentElement.setAttribute('data-theme', 'dark');
		}
	};

	return (
		<div className='content'>
			<Navbar />
			<Form onChange={handleChange} onClick={handleClick} />
			{showResult && <Card username={username} />}
			<Button onClick={toggleTheme}>Toggle theme</Button>
		</div>
	);
}

export default App;
