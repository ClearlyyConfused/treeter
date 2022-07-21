import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageSidebar from '../Homepage/PageSidebar';
import CommentForm from './CommentForm';
import PostLikes from '../Homepage/PostLikes';
import './post.css';

function Post() {
	const { postId } = useParams();
	const [postInfo, setPostInfo] = useState(null);
	const [loading, setLoading] = useState(true);

	function getComments() {
		fetch('https://treeter-api.herokuapp.com/posts/' + postId, {
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
		})
			.then((response) => response.json())
			.then((data) => {
				data.comments.sort((a, b) => {
					if (new Date(b.timestamp) - new Date(a.timestamp) === 0) {
						return -1;
					}
					return new Date(b.timestamp) - new Date(a.timestamp);
				});
				setPostInfo(data);
				setLoading(false);
			});
	}

	useEffect(() => {
		getComments();
	}, []);

	return (
		<div className="post-info-page">
			<div className="post-info-container">
				{loading ? (
					<div>Loading...</div>
				) : (
					<div>
						<div className="comment-header">
							<div className="comment-title">
								<h3>{postInfo.author}</h3>
								<p>on {postInfo.timestamp}</p>
							</div>
							<p>{postInfo.content}</p>
						</div>
						<div className="comment-footer">
							<CommentForm postId={postId} getComments={getComments} />
							<PostLikes
								postId={postId}
								getPosts={getComments}
								postLikes={postInfo.likes}
							/>
						</div>
						<div className="post-comments">
							{postInfo.comments.map((comment) => {
								return (
									<div className="post-comment">
										<div className="comment-title">
											<h4>{comment.author}</h4>
											<p>on {comment.timestamp}</p>
										</div>
										<p>{comment.content}</p>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</div>
			<PageSidebar />
		</div>
	);
}

export default Post;
