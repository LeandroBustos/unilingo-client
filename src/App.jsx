import mindcoLogo from './images/MindcoLogo.png'
import heroHome from './images/Hero-Home.jpeg'
import background from './images/Footer.png'
import './App.css';
import UserForm from './Components/UserForm';

function App() {
	return (
		<div className="App">
			<header
				className="App-header"
			>
				<img src={heroHome} className="App-logo" alt="background" />
				<img src={mindcoLogo} alt="mindco-logo" style={{ position: "absolute" }} />
			</header>
			<div
				className='App-body'
				style={{
					background: `url(${background}) no-repeat`
				}}
			>
				<UserForm />
				<a
					href="https://lookerstudio.google.com/embed/reporting/03c9ff32-1f08-4add-b7f8-01419523dfbd/page/EweLD"
					target='blank'
				>
					Informe de usuarios
				</a>
			</div>
		</div>
	);
}

export default App;
