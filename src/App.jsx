import './App.scss';
import { useState, useRef } from 'react';
import Img from '#/image';
import Button from '#/ui/Button';

export default function App() {

	const [img, setImg] = useState("");

	const inputFile = useRef(null);

	const readImg = e => {
		if (!e.target.files.length) return;
		const [file] = Array.from(e.target.files);
		const reader = new FileReader();
		reader.addEventListener("loadend", e => {
			setImg(e.currentTarget.result)
		});
		reader.readAsDataURL(file)
	}

	const triggerInput = e => {
		inputFile.current.click()
	}

	return (
		<div class="App">
			<div class="app">
				<div class="app__inner">
					{(img)
						? <Img src={img} />
						: <>
							<input onChange={readImg} ref={inputFile} style={{ display: "none" }} id="file" type="file" />
							<Button modifier="primary" onClick={triggerInput}>Open</Button>
						</>
					}
				</div>
			</div>
		</div>
	)
}