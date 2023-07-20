import { useState } from 'react';

function PostForm({ getPosts }) {
	const [content, setContent] = useState('');

	function handleSubmit(e) {
		e.preventDefault();

		let timestamp = new Date();
		timestamp = timestamp.toLocaleDateString('en-US', {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		});

		let reader = new FileReader();
		reader.readAsDataURL(e.target.elements.postImage.files[0]);

		reader.onloadend = () => {
			const image = reader.result;

			fetch('https://treeter-api.vercel.app/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					token: localStorage.getItem('token'),
				},
				body: JSON.stringify({ content: content, timestamp: timestamp, image: image }),
			}).then(() => getPosts());
			setContent('');
		};
	}

	return (
		<div className="post-form">
			<form onSubmit={handleSubmit}>
				<textarea
					type="text"
					name="content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					maxLength="250"
					placeholder="Send out a Treet!"
				/>
				<label htmlFor="postImage">Upload Image</label>
				<input type="file" id="postImage" name="postImage" accept="image/png, image/jpeg"></input>
				<button type="submit">Treet</button>
			</form>
		</div>
	);
}

export default PostForm;
