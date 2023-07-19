import { useState } from 'react';

function PostInfoLogic(postId) {
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);

	function getPostData() {
		fetch('https://treeter-api.vercel.app/posts/' + postId, {
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
				setPost(data);
				setLoading(false);
			});
	}

	return { post, loading, getPostData };
}

export default PostInfoLogic;
