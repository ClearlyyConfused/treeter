import { useState, useEffect } from 'react';
import PostForm from './PostForm';
import PostLikes from './PostLikes';
import PostComments from './PostComments';

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
								<div className="post-title">
									<h4>{post.author}</h4>
									<p>on {post.timestamp}</p>
								</div>
								<p>{post.content}</p>
								<div className="post-footer">
									<PostComments
										postId={post._id}
										getPosts={getPosts}
										postComments={post.comments}
									/>
									<PostLikes
										postId={post._id}
										getPosts={getPosts}
										postLikes={post.likes}
									/>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default Posts;
