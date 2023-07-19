import view from '../../Images/view.svg';

function ViewPost({ post }) {
	return (
		<div className="footer-button">
			<img src={view} alt="" />
			<p>{post.views}</p>
		</div>
	);
}

export default ViewPost;
