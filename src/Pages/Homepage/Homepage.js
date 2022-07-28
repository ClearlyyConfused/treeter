import { useEffect } from 'react';
import PageSidebar from '../../Components/PageSidebar';
import PostFunctions from '../../Components/PostFunctions/PostFunctions';
import HomepageLogic from './HomepageLogic';
import './homepage.css';

function HomePage() {
	const { posts, loading, getPosts } = HomepageLogic();
	const { AddPost, LikePost, CommentPost, DeletePost, UpdatePost } = PostFunctions();

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className="homepage">
			<div className="homepage-posts">
				<h1>All Posts</h1>
				<AddPost getPosts={getPosts} />
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
										<CommentPost post={post} />
										<LikePost post={post} getPosts={getPosts} />
										<DeletePost postId={post._id} getPosts={getPosts} />
										<UpdatePost postId={post._id} />
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
			<PageSidebar />
		</div>
	);
}

export default HomePage;
