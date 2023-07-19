import { useEffect, useState } from 'react';
import share from '../../Images/share.svg';

function SharePost({ link }) {
	const [displayMessage, setDisplayMessage] = useState(false);

	// fades out link copied message after some time
	useEffect(() => {
		let timer;
		if (displayMessage) {
			setTimeout(() => {
				setDisplayMessage(false);
			}, 500);
			return () => {
				clearTimeout(timer);
			};
		}
	}, [displayMessage]);

	function copyLink() {
		navigator.clipboard.writeText('localhost:3000/' + link);
	}

	return (
		<button
			className="footer-button"
			onClick={() => {
				setDisplayMessage(true);
				copyLink();
			}}
		>
			<img src={share} alt="" />
			<p className={displayMessage ? 'link-copied' : 'link-copied hidden'}>Link Copied</p>
		</button>
	);
}

export default SharePost;
