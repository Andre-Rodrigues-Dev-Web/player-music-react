export Control = (props) =>{
	
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
export default Control;