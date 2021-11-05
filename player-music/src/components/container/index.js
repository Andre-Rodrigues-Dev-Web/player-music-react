import Avatar from "../avatar";

const Container = () =>{
	let [idx, setIdx] = React.useState(0);
	let [playState, setPlayState] = React.useState(false);
	let oldIdx = React.useRef(idx)
	React.useEffect(() => {
		
		if(playState === true)
			player.play()
		else
			player.pause()
		if(idx !== oldIdx.current){
			player.pause()
			player.src = tracks[idx].source
			player.load()
			player.play()
			setPlayState(true)
			oldIdx.current = idx
		}
			
	})
	
	return(
		<div className="playerContaier">
			<Avatar idx={idx}/>
			<Progress 
				setIdx={setIdx} 
				idx={idx} 
			/>
			<Control 
				setIdx={setIdx} 
				idx={idx}  
				playState={playState} 
				setPlayState={setPlayState}/>
			<Options 
				setIdx={setIdx} 
				idx={idx}
			/>
		</div>
	);
}

export default Container;