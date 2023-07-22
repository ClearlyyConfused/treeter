import { useState } from 'react';

function PostInfoLogic(postId) {
	const [post, setPost] = useState(null);
	const [postComments, setPostComments] = useState([]);
	const [loading, setLoading] = useState(true);

	function getPostData() {
		fetch('https://treeter-api.vercel.app/posts/' + postId, {
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
		}).then((response) => {
			response.json().then((data) => {
				if (data !== null) {
					data.comments.sort((a, b) => {
						if (new Date(b.timestamp) - new Date(a.timestamp) === 0) {
							return -1;
						}
						return new Date(b.timestamp) - new Date(a.timestamp);
					});
					setPost(data);
					fetchAllComment(data.comments);
					setLoading(false);
				} else {
					fetch('https://treeter-api.vercel.app/comments/' + postId, {
						headers: {
							'Content-Type': 'application/json',
							token: localStorage.getItem('token'),
						},
					}).then((response) => {
						response.json().then((data) => {
							data.comments.sort((a, b) => {
								if (new Date(b.timestamp) - new Date(a.timestamp) === 0) {
									return -1;
								}
								return new Date(b.timestamp) - new Date(a.timestamp);
							});
							setPost(data);
							fetchAllComment(data.comments);
							setLoading(false);
						});
					});
				}
			});
		});
	}

	async function fetchComment(commentId) {
		// returns the overall result
		return fetch('https://treeter-api.vercel.app/comments/' + commentId, {
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
		})
			.then((res) => res.json())
			.then((data) => {
				return data;
			});
	}

	async function fetchAllComment(postCommentIds) {
		let array = [];
		for (const commentId of postCommentIds) {
			const data = await fetchComment(commentId);
			array.push(data);
		}
		setPostComments(array.reverse());
	}

	return { post, postComments, loading, getPostData };
}

export default PostInfoLogic;
