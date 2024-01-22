import React from 'react';
import './App.css';
import VideoContainer from './Components/VideoContainer';

function App() {
	return (
		<div className="App">
			<header
				className="App-header"
			>
				<h1> UNILINGO PROJECT</h1>
			</header>
			<div
				className='App-body'
			>
				<VideoContainer />
			</div>
		</div>
	);
}

export default App;
