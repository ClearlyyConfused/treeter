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

	return (
		<div className="homepage-posts">
			<h1>All Posts</h1>
			<PostForm />
			{loading ? (
				<div>Loading Posts...</div>
			) : (
				<div>
					{posts.map((post) => {
						return (
							<div className="homepage-post">
								<h4>{post.author}</h4>
								<p>{post.content}</p>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default Posts;
