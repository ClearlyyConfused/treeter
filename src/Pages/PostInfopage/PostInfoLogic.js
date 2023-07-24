import { useState } from 'react';

function PostInfoLogic(postId) {
	const [post, setPost] = useState(undefined);
	const [postComments, setPostComments] = useState(undefined);
	const [replyChain, setReplyChain] = useState(undefined);
	const [loading, setLoading] = useState(true);

	function getPostData() {
		fetch('https://treeter-api.vercel.app/posts/' + postId, {
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
		}).then((response) => {
			response.json().then((data) => {
				if (!data) {
					setPost('Post Deleted');
				}
				data.comments.sort((a, b) => {
					if (new Date(b.timestamp) - new Date(a.timestamp) === 0) {
						return -1;
					}
					return new Date(b.timestamp) - new Date(a.timestamp);
				});
				setPost(data);
				fetchAllComment(data.comments);
				if (data.replyChain) {
					fetchReplyChain(data.replyChain);
				} else {
					fetchReplyChain([]);
				}
			});
		});
	}

	function fetchAllComment(postCommentIds) {
		fetch('https://treeter-api.vercel.app/posts/array', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
			body: JSON.stringify({ array: postCommentIds }),
		}).then((res) =>
			res.json().then((data) => {
				setPostComments(data.reverse());
			})
		);
	}

	function fetchReplyChain(replyChainIds) {
		fetch('https://treeter-api.vercel.app/posts/array', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
			body: JSON.stringify({ array: replyChainIds }),
		}).then((res) =>
			res.json().then((data) => {
				setReplyChain(data);
			})
		);
	}

	return { post, postComments, loading, getPostData, replyChain, setLoading };
}

export default PostInfoLogic;
