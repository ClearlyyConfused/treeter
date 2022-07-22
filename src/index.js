import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Post from './components/Post/PostInfo';
import PostUpdateForm from './components/subcomponents/PostUpdateForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/:postId/update" element={<PostUpdateForm />} />
				<Route path="/:postId" element={<Post />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
