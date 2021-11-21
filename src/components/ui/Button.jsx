import './styles.scss';

export default function Button({ children, modifier, type = "button", ...props }) {

	return (
		<button
			className={(modifier) ? `Button Button--${modifier}` : `Button`}
			type={type}
			{...props}
		>
			{children}
		</button>
	);

}