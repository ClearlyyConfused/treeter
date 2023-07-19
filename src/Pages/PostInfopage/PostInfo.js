import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import PostInfoLogic from './PostInfoLogic';
import PageSidebar from '../../Components/PageSidebar';
import CommentFunctions from '../../Components/CommentFunctions/CommentFunctions';
import PostFunctions from '../../Components/PostFunctions/PostFunctions';

import './post.css';

function Post() {
	const { postId } = useParams();
	const { post, loading, getPostData } = PostInfoLogic(postId);
	const { AddComment } = CommentFunctions();
	const { LikePost, CommentPost, ViewPost, SharePost } = PostFunctions();

	const [viewed, setViewed] = useState(false);
	// false -> API fetch to count current view -> reload with updated views -> true

	useEffect(() => {
		getPostData();
		if (!viewed) {
			const reqOptions = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					token: localStorage.getItem('token'),
				},
			};
			fetch('https://treeter-api.vercel.app/posts/' + postId + '/view', reqOptions).then((res) =>
				res.json().then((data) => {
					setViewed(true);
				})
			);
		}
	}, [viewed]);

	return (
		<div className="post-info-page">
			<div className="post-info-content">
				{loading ? (
					<div>Loading...</div>
				) : (
					<div>
						<div className="treet">
							<div className="treet-title">
								<h3>{post.author}</h3>
								{post.updated ? <p>updated {post.timestamp}</p> : <p>on {post.timestamp}</p>}
							</div>
							<p>{post.content}</p>
							<div className="treet-footer">
								<CommentPost post={post} />
								<LikePost post={post} getPosts={getPostData} />
								<ViewPost post={post} />
								<SharePost link={post._id} />
							</div>
						</div>

						<div className="post-comments">
							<AddComment postId={postId} getComments={getPostData} />
							{post.comments.map((comment) => {
								return (
									<div className="post-comment">
										<div className="post-comment-title">
											<h4>{comment.author}</h4>
											{comment.updated ? <p>updated {comment.timestamp}</p> : <p>on {comment.timestamp}</p>}
										</div>
										<p>{comment.content}</p>
										<div className="post-comment-footer">
											{/* 
											<DeleteComment postId={postId} getComments={getComments} comment={comment} />
											<UpdateComment comment={comment} postId={postId} />
											*/}
										</div>
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
