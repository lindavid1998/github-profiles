import React from 'react';
import './TextInput.css';

const TextInput = ({ id, label, children }) => {
	return (
		<div className='text-input'>
			<label htmlFor={id}>{label}</label>
			<input id={id} type='text' placeholder={children} />
		</div>
	);
};

export default TextInput;
