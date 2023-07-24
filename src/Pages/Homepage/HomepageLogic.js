import { useState } from 'react';

function HomepageLogic() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [profilePictures, setProfilePictures] = useState({});
	const [x, setX] = useState(0);

	function getPosts() {
		fetch('https://treeter-api.vercel.app/posts', {
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
		})
			.then((response) => response.json())
			.then((data) => {
				data.sort((a, b) => {
					if (new Date(b.timestamp) - new Date(a.timestamp) === 0) {
						return -1;
					}
					return new Date(b.timestamp) - new Date(a.timestamp);
				});
				setPosts(data);
				setLoading(false);
			});
	}

	function uploadPFP() {
		if (document.getElementById('image').files[0] === undefined) {
			return;
		}

		let reader = new FileReader();
		reader.readAsDataURL(document.getElementById('image').files[0]);
		reader.onloadend = () => {
			const image = reader.result;

			fetch('https://treeter-api.vercel.app/updateProfilePicture', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					token: localStorage.getItem('token'),
				},
				body: JSON.stringify({ image: image }),
			})
				.then((response) => response.json())
				.then((data) => {
					window.location.reload();
				});
		};
	}

	async function fetchPFP(username) {
		return fetch('https://treeter-api.vercel.app/getProfilePicture', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
			body: JSON.stringify({ username: username }),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.profilePicture) {
					return data.profilePicture;
				} else {
					return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAPDRANEA0NDw0QDg0NDw0NDg8NDQ0OIBEWFhYRFRMZHCggGBolGxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NDw8NFSsZFRkrKys3LTcrNystLSsrKystLS0tLSs3NysrKzctKysrKysrKysrKysrKysrLSsrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAAAQQFBgMCB//EADQQAQACAAMFAg0FAQEAAAAAAAABAgMFEQQhMUFREnEVIjIzUmGBkqGxssHREyNCcoKRc//EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A/RAG2QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfX6kgPkAAAAAAAAAAAAECpEJEAAAAAAAAAAAAAAAAAAAAAAAAK8dObR2TKrW33nSOURxe+U7DER+pbfaeETyhqM2qq4WX4VeFdZ6zMrEYdY/jH/H0Ir4tgUnjWN6nj5XS0eLHZn1TuXwHNbTsd8PjGscpjg8HVYlItWazwmNHPbds04V9ONZ31lqVFYSSqIAAAAAAAAAAAAAAAAAAXMr2eL33xrWu+VKW7kuHphdrnMpVaERyEjKoEoABIIVtu2eMSk7t8b4npK0iQcnPHRMrGY4cVxrREcd/qV20QAIAAAAAAAAAAAAAAAAh02xRphV5eLEuZdRs3m6f1r8kqvYQllQAAABEpRIMXO40vWdOMT7eDOaee+Vh91vszFiIAaQAAAAAAAAAAAAAAABDpMuxO1hVn1afZzjWyTHjxsOePlR00Sq1xCWVAAAAESl83tpGs8IBh51i64sV6R+FCHptWJ272t1mZjXlDyhpEgKgAAAAAAAAAAAAAAAA+8DEml4vHGJfBArqNnxovWLRMevTlL1c5sG2fpW59meMfd0GHiRaItE6xLKvsBAAAZWb7XunCjju7XzWMw22MOsxG+8xMRpynrLAtaZmZmdZnisggBpkAAAAAAAAAAAAAAAAAATCEwKh67PtV8PyZ3dJ3w80aINbZ845Xr7YWYzbC9K3u2/Dnwwbt83w44az03THzUsXNcS3DSsfFQQYPq9pmZmZmZnqhCVQAAAAAAAAAAAAAAAAAgB9YeHNp0rEz7Ny9sOW9vxr6xXdpHOWzhYFaRpWsQmrjHwMptO+09mOi5TKMOOM3n2xH2aAmqpeC8Lpb3pPBeF6M+9K6IKXgrC9GfelHgvC9GfeleAUfBWF6M+9KfBeF6M+9K6Ao+CsL0Z96XzbKMOeE3jumPvDQDRk3yWP44k+2uqpjZZi1/j2o61nX4cXQi6Y5K0TE6TExPSd0jqMfZ6XjS1Yn1847pYe3ZfbD8aPGp15171lRTAVAAAAAAAAAACGtl2XcL39kK+U7N27dqeFfm34hm1URCQRUJAAAAAAAAAAABExru5JAYOZ7D+nPbr5E8vRn8KDq70i0TWY1iY0mHNbXgTh3mk98T1jlLUqPEBUAAAAAAE0rMzERxmYiEL+TYPaxe1ypGvt5fcqtjZNnjDpFY75nrPOXsDCgAAAAAAAAAAAAAAADOzrA7WH24414/wBWi+ManaravWsx8AcqIS2yAAAAAANvIq/t2nrfT4R+WI38mj9mPXa0/FKsXgGVAAAAAAAAAAAAAAAAAAcrtFdL3jpe0fGXw9dr87if+l/ql5NoACAAAADoco8xX/X1S550GUeYr32+qUqxdAZUAAAAAAAAAAAAAAAACQHM7dH72J/e3zeCzmUaY9++J+EKzaAAgAAAA6DKPMV77fVIJVi6AyoAAAAAAAAAAAAAAACJISA53NfP3/z9MKgNxAAQAB//2Q==';
				}
			});
	}

	// updates profilePictures dictionary with username-pfp pair
	async function getPFP(username) {
		const pfp = await fetchPFP(username);
		let newProfilePictures = profilePictures;
		newProfilePictures[username] = pfp;
		setProfilePictures(newProfilePictures);

		setX(x + 1);
		// makes sure img src's re-render with new profilePictures instead of returned promise from calling function
	}

	return { posts, loading, getPosts, uploadPFP, fetchPFP, getPFP, profilePictures };
}

export default HomepageLogic;
