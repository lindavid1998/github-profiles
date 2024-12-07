import React, { useEffect, useState, Suspense } from 'react';
import './Card.css';
import { DateTime } from 'luxon';
import Error from './Error.jsx';

// for invalid usernames:
// {
//     "message": "Not Found",
//     "documentation_url": "https://docs.github.com/rest",
//     "status": "404"
// }

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
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}
			const json = await response.json();
      setUser(json);
		} catch (error) {
      setError(error);
			// TODO: how to handle invalid username?
		}
    setLoaded(true);
	};

	const getRepoData = async () => {
		const url = `https://api.github.com/users/${username}/repos`;
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}
			const arr = await response.json();

      // sort arr by modified time
      arr.sort(compareRepoUpdatedTimes);

			setRepos(arr);
      setRepoCount(arr.length);
		} catch (error) {
			setError(error);
		}
  };
  
  const compareRepoUpdatedTimes = (a, b) => {
    const aDatetime = DateTime.fromISO(a.updated_at);
    const bDatetime = DateTime.fromISO(b.updated_at);
    return bDatetime.toMillis() - aDatetime.toMillis();
  }

  useEffect(() => {
    setTimeout(() => {
      getUserData();
      getRepoData();
    }, 5000)
  }, []);

  if (error) {
    return <Error onAcknowledge={() => setError(null)}>Username not found</Error>;
  }

  if (!loaded) {
    // how can i use Suspense instead?
    return <>Loading...</>
  }

  if (!user.length) {
    return <></>
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
