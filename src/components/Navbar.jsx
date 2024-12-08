import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [theme, setTheme] = useState('dark')
  
  const toggleTheme = () => {
		setTheme((prevTheme) => {
			const newTheme = prevTheme === 'light' ? 'dark' : 'light';
			document.documentElement.setAttribute('data-theme', newTheme);
			return newTheme;
		});
	};

  return (
		<div className='navbar'>
			GitHub Profiles
			<div className='appearance'>
				<FontAwesomeIcon icon={theme == 'dark' ? faSun : faMoon} onClick={toggleTheme}/>
			</div>
		</div>
	);
}

export default Navbar