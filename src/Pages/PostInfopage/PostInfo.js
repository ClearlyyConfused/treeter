import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import PostInfoLogic from './PostInfoLogic';
import PageSidebar from '../../Components/PageSidebar';
import PostLikes from '../../Components/PostFunctions/LikePost';
import CommentFunctions from '../../Components/CommentFunctions/CommentFunctions';

import './post.css';

function Post() {
	const { postId } = useParams();
	const { post, loading, getComments } = PostInfoLogic(postId);
	const { AddComment, DeleteComment, UpdateComment } = CommentFunctions();

	useEffect(() => {
		getComments();
	}, []);

	return (
		<div className="post-info-page">
			<div className="post-info-content">
				{loading ? (
					<div>Loading...</div>
				) : (
					<div>
						<div className="treet-header">
							<div className="treet-title">
								<h3>{post.author}</h3>
								{post.updated ? <p>updated</p> : <p>on</p>}
								<p>{post.timestamp}</p>
							</div>
							<p>{post.content}</p>
						</div>
						<div className="treet-footer">
							<AddComment postId={postId} getComments={getComments} />
							<PostLikes post={post} getPosts={getComments} />
						</div>

						<div className="post-comments">
							{post.comments.map((comment) => {
								return (
									<div className="post-comment">
										<div className="post-comment-title">
											<h4>{comment.author}</h4>
											{comment.updated ? <p>updated</p> : <p>on</p>}
											<p>{comment.timestamp}</p>
										</div>
										<p>{comment.content}</p>
										<div className="post-comment-footer">
											<DeleteComment
												postId={postId}
												getComments={getComments}
												comment={comment}
											/>
											<UpdateComment comment={comment} postId={postId} />
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
