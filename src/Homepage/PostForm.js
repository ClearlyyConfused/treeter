import { useState } from 'react';

function PostForm() {
	const [content, setContent] = useState('');

	function handleSubmit(e) {
		e.preventDefault();

		const req = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				token: localStorage.getItem('token'),
			},
			body: JSON.stringify({ content: content }),
		};
		fetch('https://treetter.herokuapp.com/posts', req);
		window.location.reload();
	}

	return (
		<div className="post-form">
			<form onSubmit={handleSubmit}>
				<label htmlFor="content"></label>
				<input
					type="text"
					name="content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<button type="submit">Treet</button>
			</form>
		</div>
	);
}

export default PostForm;
