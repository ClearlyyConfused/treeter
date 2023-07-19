import { useEffect } from 'react';
import PageSidebar from '../../Components/PageSidebar';
import PostFunctions from '../../Components/PostFunctions/PostFunctions';
import HomepageLogic from './HomepageLogic';
import './homepage.css';

function HomePage() {
	const { posts, loading, getPosts } = HomepageLogic();
	const { AddPost, LikePost, CommentPost, ViewPost, SharePost } = PostFunctions();

	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return (
		<div className="homepage">
			<div className="homepage-posts">
				<h1>Home</h1>
				<AddPost getPosts={getPosts} />
				{loading ? (
					<div>Loading Posts...</div>
				) : (
					<div>
						{posts.map((post) => {
							return (
								<div className="homepage-post">
									<a className="homepage-post-content" href={post._id}>
										<div className="post-title">
											<h4>{post.author}</h4>
											{post.updated ? <p>updated {post.timestamp}</p> : <p>on {post.timestamp}</p>}
										</div>
										<p>{post.content}</p>
									</a>
									<div className="post-footer">
										<CommentPost post={post} />
										<LikePost post={post} getPosts={getPosts} />
										<ViewPost post={post} />
										<SharePost link={post._id} />
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
