import React from 'react';
import './Card.css';

// request URLs
// https://api.github.com/users/lindavid1998
// https://api.github.com/users/lindavid1998/repos

// mock data
const user = {
	avatar_url: 'https://avatars.githubusercontent.com/u/22776267?v=4',
	name: 'David Lin',
	public_repos: 39,
	followers: 1,
	following: 5,
	html_url: 'https://github.com/lindavid1998',
};
const username = 'lindavid1998';
const repoCount = 5;
const repo = {
	name: 'css-exercises',
	full_name: 'lindavid1998/css-exercises',
	html_url: 'https://github.com/lindavid1998/css-exercises',
};

// for invalid usernames:
// {
//     "message": "Not Found",
//     "documentation_url": "https://docs.github.com/rest",
//     "status": "404"
// }

const Stat = ({ label, children }) => {
	return (
		<div className='stat'>
			<span className='stat-label'>{label}: </span>
			<span className='stat-value'>{children}</span>
		</div>
	);
};

// User can see the avatar, username, followers and repository count of
// searched user User can see the top 4 repositories of searched user
const Card = () => {
  // TODO: on mount, call github API and populate state

  // how to handle invalid username?

	return (
		<div className='card'>
			<div className='avatar-section'>
				<div className='avatar'>
					<img src={user.avatar_url}></img>
				</div>
				<div className='username'>
					<a href={user.html_url}>{username}</a>
				</div>
			</div>
			<div className='data-section'>
				<div>
					<Stat label='Followers'>{user.followers}</Stat>
					<Stat label='Following'>{user.following}</Stat>
					<Stat label='Repositories'>{repoCount}</Stat>
				</div>

				<div className='recent-repos'>
					<div className='stat-label'>Recent repositories:</div>
					<div>
						<a href={repo.html_url}>{repo.name}</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
