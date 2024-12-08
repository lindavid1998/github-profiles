import React from 'react';
import './ErrorMessage.css';
import Button from './Button.jsx';

const ErrorMessage = ({ children, onAcknowledge }) => {
	return (
		<div className='error'>
			<div className='error-card'>
				<div className='error-title'>Error</div>
				<div className='error-message'>{children}</div>
				<div className='btn'>
					<Button onClick={onAcknowledge}>OK</Button>
				</div>
			</div>
		</div>
	);
};

export default ErrorMessage;
