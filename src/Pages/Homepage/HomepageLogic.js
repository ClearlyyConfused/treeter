import { useState } from 'react';

function HomepageLogic() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	function getPosts() {
		console.log('ran');
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

	return { posts, loading, getPosts };
}

export default HomepageLogic;
