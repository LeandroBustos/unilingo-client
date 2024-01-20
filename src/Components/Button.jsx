const Button = ({ type, content, ...props }) => {
	return (
		<button
			type={type}
			{...props}
		>
			{content}
		</button>
	);
}

export const SubmitButton = ({ content, type, ...props }) => {
	return (
		<Button
			content={content}
			type={type}
			style={{
				width: 212,
				background: "#4EBFD1",
				border: "3px solid #4EBFD1",
				borderRadius: 3,
				borderStyle: "solid",
				borderColor: "#4EBFD1",
				color: "#ffffff",
				fontSize: 15,
				fontFamily: "sans-serif",
				textTransform: "uppercase"
			}}
			{...props}
		/>
	);
}