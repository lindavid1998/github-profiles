import React from 'react';
import './TextInput.css';

const TextInput = ({ id, label, children, onChange }) => {
	return (
		<div className='text-input'>
			{label && <label htmlFor={id}>{label}</label>}
			<input id={id} type='text' placeholder={children} onChange={onChange} />
		</div>
	);
};

export default TextInput;
