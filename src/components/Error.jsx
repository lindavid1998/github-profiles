import React from 'react';
import './Error.css';
import Button from './Button.jsx';

const Error = ({ children }) => {
	return (
		<div className='error'>
			<div className='error-card'>
				<div className='error-title'>Error</div>
				<div className='error-message'>{children}</div>
				<div className='btn'>
					<Button>OK</Button>
				</div>
			</div>
		</div>
	);
};

export default Error
