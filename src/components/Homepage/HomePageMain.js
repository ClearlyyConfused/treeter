import { useState, useEffect } from 'react';
import PostAdd from './PostAdd';
import PostLikes from '../subcomponents/PostLikes';
import PostComments from '../subcomponents/PostComments';
import PostDelete from '../subcomponents/PostDelete';
import PostUpdate from '../subcomponents/PostUpdate';

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

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className="homepage-posts">
			<h1>All Posts</h1>
			<PostAdd getPosts={getPosts} />
			{loading ? (
				<div>Loading Posts...</div>
			) : (
				<div>
					{posts.map((post) => {
						return (
							<div className="homepage-post">
								<div className="post-title">
									<h4>{post.author}</h4>
									{post.updated ? <p>updated</p> : <p>on</p>}
									<p>{post.timestamp}</p>
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
									<PostDelete postId={post._id} getPosts={getPosts} />
									<PostUpdate postId={post._id} />
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
