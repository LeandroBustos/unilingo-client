const H2 = ({ content, ...props }) => {
	return (
		<h2
			{...props}
		>
			{content}
		</h2>
	);
}


export const H2Title = ({ content }) => {
	return (
		<H2
			content={content}
			style={{
				color: "#1E1E1E",
				fontSize: 34,
				fontfamily: "Inter, Sans-serif"
			}}
		/>
	)
}