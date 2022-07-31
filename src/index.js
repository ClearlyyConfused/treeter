import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Post from './Pages/PostInfopage/PostInfo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/treeter" element={<App />} />
				<Route path="/treeter/:postId" element={<Post />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
