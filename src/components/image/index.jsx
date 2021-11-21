import "./styles.scss";
import Note from "../note/index";
import { useState, useRef } from 'react';

export default function Img({ src }) {
	const [notes, setNotes] = useState([])
	const img = useRef(null);

	const percentagePosСalc = (num, amount) => ~~(num * 100 / amount);

	const addNote = e => {
		let text = prompt('Heading for the note:')
		if (!text) return alert('Please write a name for the note!');
		setNotes(prev => [...prev, { id: (Date.now() / 2) * 2, text, x: percentagePosСalc(e.nativeEvent.offsetX, img.current.width), y: percentagePosСalc(e.nativeEvent.offsetY, img.current.height) }])
	}

	return (
		<div className="Img">
			<div onClick={e => addNote(e)} className="Img__container">
				<img ref={img} src={src} />
				{notes.map(note => <Note key={note.id} noteText={note.text} x={note.x} y={note.y} />)}
			</div>
		</div>
	)
}