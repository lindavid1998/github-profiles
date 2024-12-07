import React from 'react'
import Button from './Button.jsx';
import TextInput from './TextInput.jsx';
import './Form.css'

const Form = ({ onChange, onClick }) => {
	return (
		<div className='form'>
			<div className='form-row'>
				<TextInput onChange={onChange}>Enter a username</TextInput>
				<Button onClick={onClick}>Search</Button>
			</div>
		</div>
	);
};

export default Form