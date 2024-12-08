import React, { useEffect, useState, Suspense } from 'react';
import './Card.css';
import { DateTime } from 'luxon';
import ErrorMessage from './ErrorMessage.jsx';

const n = 4; // number of repos to show

const Stat = ({ label, children }) => {
	return (
		<div className='stat'>
			<span className='stat-label'>{label}: </span>
			<span className='stat-value'>{children}</span>
		</div>
	);
};

const Card = ({ username }) => {
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);
	const [repoCount, setRepoCount] = useState(-1);
	const [error, setError] = useState(null);
	const [loaded, setLoaded] = useState(false);

	const getUserData = async () => {
		const url = `https://api.github.com/users/${username}`;
		try {
			const response = await fetch(url);
			const json = await response.json();
      
			if (!response.ok) {
        const errorMsg = json.message || 'An error occurred'
        throw new Error(errorMsg)
			}
			
      setUser(json);
		} catch (err) {
			setError(err);
		}
		setLoaded(true);
	};

	const getRepoData = async () => {
		const url = `https://api.github.com/users/${username}/repos`;
		try {
			const response = await fetch(url);
			const data = await response.json();
			if (!response.ok) {
				const errorMsg = json.message || 'An error occurred';
				throw new Error(errorMsg);
			}

			// sort arr by modified time
			data.sort(compareRepoUpdatedTimes);

			setRepos(data);
			setRepoCount(data.length);
		} catch (err) {
			setError(err);
		}
	};

	const compareRepoUpdatedTimes = (a, b) => {
		const aDatetime = DateTime.fromISO(a.updated_at);
		const bDatetime = DateTime.fromISO(b.updated_at);
		return bDatetime.toMillis() - aDatetime.toMillis();
	};

  useEffect(() => {
    setLoaded(false)
		getUserData();
		getRepoData();
  }, [username]);
  
  const handleAcknowledge = () => {
    setError(null);
    setUser({});
    setRepos([])
  }

	if (error) {
		return <ErrorMessage onAcknowledge={handleAcknowledge}>{error.message}</ErrorMessage>;
	}

	if (!loaded) {
		// how can i use Suspense instead?
		return <>Loading...</>;
	}

	if (!Object.keys(user).length) {
		return <></>;
	}

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
					{repos.slice(0, n).map((repo, index) => (
						<div key={index}>
							<a href={repo.html_url}>{repo.name}</a>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Card;
