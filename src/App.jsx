import './App.css';
import React, { useState, Suspense } from 'react';
import Card from './components/Card.jsx';
import Form from './components/Form.jsx';
import Navbar from './components/Navbar.jsx';

// TODO: add form validation (username cant be empty)

function App() {
	const [username, setUsername] = useState("");

	const handleChange = (e) => {
		setUsername(e.target.value);
	}

	return (
		<div>
			<Navbar></Navbar>
			<Form onChange={handleChange}></Form>
			{/* <Card username='lindavid1998'></Card> */}
		</div>
	);
}

export default App;
