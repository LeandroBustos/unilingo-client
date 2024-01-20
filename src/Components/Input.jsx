const Input = ({ onChange, value, type, placeholder, ...props }) => {
	return (
		<input
			onChange={onChange}
			value={value}
			type={type}
			placeholder={placeholder}
			{...props}
		/>
	);
}

export const InputForm = ({ onChange, value, type, placeholder, ...props }) => {
	return (
		<Input
			onChange={onChange}
			value={value}
			type={type}
			placeholder={placeholder}
			style={{
				width: 202,
				fontSize: 15,
				border: "3px solid #F2F3F5",
				borderRadius: 3,
				borderStyle: "solid",
				borderColor: "#F2F3F5",
				backgroundColor: "#F2F3F5",
				color: "#757575"
			}}
			{...props}
		/>
	);
}