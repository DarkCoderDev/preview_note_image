import './styles.scss';

export default function Note({ noteText, x, y }) {

	return (
		<div
			onClick={e => {
				e.stopPropagation()
				e.target.remove()
			}}
			className="Note"
			style={{ left: `${x}%`, top: `${y}%` }}
		>
			{noteText}
		</div>
	)

}