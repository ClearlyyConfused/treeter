import view from '../../Images/view.svg';

function ViewPost({ post }) {
	return (
		<button className="footer-button">
			<img src={view} alt="" />
			<p>{post.views}</p>
		</button>
	);
}

export default ViewPost;
