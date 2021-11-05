
import { 
	ThreeDots, 
	ChevronLeft, 
	PauseFill, 
	PlayFill,
	SkipBackwardFill,
	SkipForwardFill,
	Shuffle,
	ArrowRepeat,
	Heart,
	BoxArrowUpRight,
	HeartFill
} from "https://cdn.skypack.dev/react-bootstrap-icons@1.5.0";



const player = new Audio(tracks[0].source)
player.setAttribute('preload', 'metadata')
const userOptions = React.createContext({
	shuffle: false,
	repeat: false,
})

function Options(props){
	let options = React.useContext(userOptions)
	let [shuffl, setShuffle] = React.useState(options.shuffle)
	let [repet, setRepeat] = React.useState(options.repeat)
	let [fav, setFav] = React.useState(tracks[props.idx].favorited)
	
	React.useEffect(() => setFav(tracks[props.idx].favorited))
	
	function shuffle(){
		options.shuffle = !options.shuffle
		options.repeat = false
		setShuffle(!shuffl)
		setRepeat(false)
	}
	
	function repeat(){
		options.repeat = !options.repeat
		options.shuffle = false
		setShuffle(false)
		setRepeat(!repet)
	}
	
	function favorite(){
		tracks[props.idx].favorited = !tracks[props.idx].favorited
		setFav(tracks[props.idx].favorited)
	}

	function openURL(){
		window.open(tracks[props.idx].url, "_blank")
	}
	
	return(
		<div className="options">
			{
				shuffl &&
				<button onClick={shuffle} className="opt" style={{color: '#147CC0'}}>
					<Shuffle/>
				</button>
				||
				<button onClick={shuffle} className="opt" >
					<Shuffle/>
				</button>
			}
			<button className="opt" onClick={openURL}>
				<BoxArrowUpRight/>
			</button>
			{
				fav &&
			<button onClick={favorite}  className="opt" style={{color: '#147CC0'}}>
				<HeartFill/>
			</button>
					||
				<button onClick={favorite}  className="opt" >
				<Heart/>
			</button>
						
				}
			{
				repet &&
			<button onClick={repeat} className="opt" style={{color: '#147CC0'}}>
				<ArrowRepeat/>
			</button>
					||
						<button onClick={repeat} className="opt">
				<ArrowRepeat/>
			</button>
				}
		</div>
	);
}

function Control(props){
	
	return(
		<div className="controls">
			<button 
				className="controlButton"
				onClick={
					x => props.setIdx(props.idx-1 < 0 ? 8 : props.idx-1)
				}>
				<SkipBackwardFill />
			</button>
			{
				props.playState === true ? 
					<button 
						className="centerButton"
						onClick={x => props.setPlayState(false)}>
						<PauseFill />
					</button> : 
					<button
						className="centerButton"
						onClick={x => props.setPlayState(true)}>
						<PlayFill />
					</button>
			}
			<button
				className="controlButton"
				onClick={x => props.setIdx((props.idx+1)%9)}>
				<SkipForwardFill />
			</button>
		</div>
	);
}

function Progress(props){
	let [currLength, setCurrLength] = React.useState(0)
	let [length, setLength] = React.useState(0)
	let options = React.useContext(userOptions)
	const progressBar = document.querySelector('.progressBar')
	
	function updateProgress(e){
		let offset = e.target.getBoundingClientRect().left
		let newOffSet = e.clientX
		let newWidth = newOffSet - offset
		progressBar.style.width = newWidth+"px"
		let secPerPx = length / 280
		player.currentTime = secPerPx * newWidth
	}
	
	setInterval(() => {
		setLength(Math.ceil(player.duration))
		setCurrLength(Math.ceil(player.currentTime))
		let secPerPx = Math.ceil(player.duration) / 280
		let newWidth = player.currentTime / secPerPx
		document.querySelector('.progressBar').style.width = newWidth+"px"
		if(player.currentTime === player.duration){
			if(options.shuffle === true){
				props.setIdx((parseInt(Math.random()*1000))%9)
			}
			else if(options.repeat === true){
				player.play()
			}
			else{
				props.setIdx((props.idx+1)%9)
			}
		}
	}, 1000);
	
	function formatTime(s){
		return Number.isNaN(s) ? '0:00' : (s-(s%=60))/60+(9<s?':':':0')+s
	}
	
	return(
		<div className="progress">
			<div className="currentTime">
				<p>{formatTime(currLength)}</p>
			</div>
			<div 
			className="progressCenter" 
			onClick={(e) => updateProgress(e)}>
				<div className="progressBar">
				</div>
			</div>
			<div className="songLength">
				<p>{formatTime(length)}</p>
			</div>
		</div>
	);
}

function Header(){
	return(
		<div className="header">
			<button className="icon">
				<ChevronLeft/>
			</button>
			<h1 className="headerText">Song</h1>
			<button className="icon">
				<ThreeDots/>
			</button>
		</div>
	);
}

const App = () => {
  return (
    <div className="container" >
			<Header/>
			<Container/>
		</div>
  );
}

export default App;
