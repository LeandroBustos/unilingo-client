import React, { useState } from 'react';

import "../styles/Form.css";
import { InputForm } from './Input';
import { SubmitButton } from './Button';

import firestore from '../services/firestore.js';
import { H2Title } from './H2';

const Login = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [tel, setTel] = useState("");
	const [interactions, setInteractions] = useState({})

	const handleInputChange = (value, stateFn, { interaction, component, type, section }) => {
		stateFn(value)
		const newInteractions = { ...interactions }
		newInteractions[interaction] = {
			cant: (interactions[interaction]?.cant || 0) + 1,
			component: component,
			interaction_type: type,
			section: section
		}
		setInteractions(newInteractions)
	}
	const handleSubmit = async (e) => {
		e.preventDefault();

		const newInteractions = { ...interactions }
		newInteractions["submit"] = {
			cant: (interactions["submit"]?.cant || 0) + 1,
			component: "BUTTON_FORM_SUBMIT",
			interaction_type: "ON_SUBMIT",
			section: "USER_FORM"
		}
		setInteractions(newInteractions)

		firestore.collection("users")
			.doc(name)
			.set({
				name,
				email,
				tel,
			})
			.then(() => {
				alert("Usuario agregado exitosamente");
			})
			.catch((error) => {
				console.log(error)
				alert(`Error: ${error}`);
			});


		firestore.collection("interactions")
			.doc(name)
			.set({
				interactions: [
					interactions.name,
					interactions.email,
					interactions.tel,
					interactions.submit
				]
			})
			.catch((error) => {
				console.log(error)
				alert(`Error: ${error}`);
			});

	};

	return (

		<div className='Form'>
			<H2Title
				content="Formulario de usuarios MindCo"
			/>
			<form
				className='Form-body'
				onSubmit={handleSubmit}>
				<InputForm
					placeholder="Nombre"
					type="text"
					onChange={(e) => handleInputChange(
						e.target.value,
						setName,
						{
							interaction: "name",
							component: "INPUT_NAME",
							type: "ON_CHANGE",
							section: "USER_FORM"
						}
					)}
					value={name}
					required
				/>
				<InputForm
					placeholder='Email'
					type="email"
					value={email}
					onChange={(e) => handleInputChange(
						e.target.value,
						setEmail,
						{
							interaction: "email",
							component: "INPUT_EMAIL",
							type: "ON_CHANGE",
							section: "USER_FORM"
						}
					)}
					required
				/>
				<InputForm
					placeholder='Tel.'
					type="tel"
					value={tel}
					onChange={(e) => handleInputChange(
						e.target.value,
						setTel,
						{
							interaction: "tel",
							component: "INPUT_TEL",
							type: "ON_CHANGE",
							section: "USER_FORM"
						}
					)}
					required
				/>
				<SubmitButton
					type='submit'
					content="Submit"
				/>
			</form>
		</div>
	);
}

export default Login;