import { useState, useEffect } from 'react';

function Posts() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch('https://treetter.herokuapp.com/posts', {
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setPosts(data);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <div>Loading Posts...</div>;
	}
	return (
		<div className="homepage-posts">
			{posts.map((post) => {
				return (
					<div className="homepage-post">
						<h4>{post.author}</h4>
						<p>{post.content}</p>
					</div>
				);
			})}
		</div>
	);
}

export default Posts;
