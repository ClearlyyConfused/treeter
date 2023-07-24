import { useState } from 'react';
import deleteIcon from '../../Images/close-icon.svg';

function PostDelete({ postId }) {
	const [deleteMessage, setDeleteMessage] = useState(false);

	function handleClick() {
		fetch('https://treeter-api.vercel.app/posts/' + postId + '/delete', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					window.location.reload();
				} else {
					alert("Cannot delete other's posts");
				}
			});
	}

	return (
		<button
			className="footer-button delete-button"
			onClick={handleClick}
			style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}
		>
			<img
				onMouseEnter={() => {
					setDeleteMessage(true);
				}}
				onMouseLeave={() => {
					setDeleteMessage(false);
				}}
				style={{ transform: 'scale(1.25)' }}
				src={deleteIcon}
				alt="Delete"
			/>
			<p
				style={{
					display: deleteMessage ? '' : 'none',
					position: 'absolute',
					bottom: '-20px',
					width: '100px',
				}}
			>
				Delete Treet
			</p>
		</button>
	);
}

export default PostDelete;
