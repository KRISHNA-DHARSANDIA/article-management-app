import React from 'react';
import ArticleEditor from './components/ArticleEditor';
import Sidebar from './components/Sidebar';
import ArticleList from './components/ArticleList';
import { ArticleProvider } from './context/ArticleContext';
import ArticleForm from './components/ArticleForm';
import './App.css';

const App = () => {
	return (
		<ArticleProvider>
			<div className="app-container">
				<Sidebar />
				<div className="main-content">
					<ArticleForm/>
					{/* <ArticleList /> */}
				</div>
			</div>
		</ArticleProvider>
	);
};

export default App;
