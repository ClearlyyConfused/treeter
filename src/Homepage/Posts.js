import { useState, useEffect } from 'react';
import PostForm from './PostForm';

function Posts() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch('https://treeter-api.herokuapp.com/posts', {
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
			<h1>All Posts</h1>
			<PostForm />
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
