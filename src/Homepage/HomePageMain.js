import { useState, useEffect } from 'react';
import PostForm from './PostForm';
import PostLikes from './PostLikes';

function Posts() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	function getPosts() {
		fetch('https://treeter-api.herokuapp.com/posts', {
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setPosts(
					data.sort((a, b) => {
						if (new Date(b.timestamp) - new Date(a.timestamp) === 0) {
							return -1;
						}
						return new Date(b.timestamp) - new Date(a.timestamp);
					})
				);
				setLoading(false);
			});
	}

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className="homepage-posts">
			<h1>All Posts</h1>
			<PostForm getPosts={getPosts} />
			{loading ? (
				<div>Loading Posts...</div>
			) : (
				<div>
					{posts.map((post) => {
						return (
							<div className="homepage-post">
								<h4>{post.author}</h4>
								<p>{post.content}</p>
								<p>{post.timestamp}</p>
								<p>Likes: {post.likes.length}</p>
								<PostLikes postId={post._id} getPosts={getPosts} />
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default Posts;
