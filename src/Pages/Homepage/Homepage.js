import { useEffect } from 'react';
import PageSidebar from '../../Components/PageSidebar';
import PostFunctions from '../../Components/PostFunctions/PostFunctions';
import HomepageLogic from './HomepageLogic';
import LoadingAnimation from '../../Components/LoadingAnimation/LoadingAnimation';
import './homepage.css';

function HomePage() {
	const { posts, loading, getPosts, uploadPFP, getPFP, profilePictures } = HomepageLogic();
	const { AddPost, LikePost, CommentPost, ViewPost, SharePost } = PostFunctions();

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<div className="homepage">
			<div className="homepage-posts">
				<div className="homepage-header">
					<h1>Home</h1>
					<div>
						<img
							src={
								profilePictures[localStorage.username]
									? profilePictures[localStorage.username]
									: getPFP(localStorage.username)
							}
							alt=""
						/>

						{/* for some reason, fixes pfp not showing up on mobile */}
						<p style={{ maxHeight: '0px', maxWidth: '0px', overflow: 'hidden' }}>
							{profilePictures[localStorage.username]}
						</p>

						<form onChange={uploadPFP}>
							<label htmlFor="image">Change PFP</label>
							<input
								style={{ display: 'none' }}
								type="file"
								id="image"
								name="image"
								accept="image/png, image/jpeg"
							></input>
						</form>
					</div>
				</div>
				<AddPost getPosts={getPosts} />
				{loading ? (
					<LoadingAnimation />
				) : (
					<div>
						{posts.map((post) => {
							return (
								<div className="homepage-post">
									<a className="homepage-post-content" href={post._id}>
										<div className="post-title">
											<img
												src={
													profilePictures[post.author] ? profilePictures[post.author] : getPFP(post.author)
												}
												alt=""
											/>
											<h4>{post.author}</h4>
											{post.updated ? <p>updated {post.timestamp}</p> : <p>on {post.timestamp}</p>}
										</div>
										<div className="post-content">
											<p>{post.content}</p>
											{post.image ? <img src={post.image} alt="" /> : ''}
										</div>
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
