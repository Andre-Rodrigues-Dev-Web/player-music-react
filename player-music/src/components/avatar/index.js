import React from 'react';

const Avatar = (props) => {	
	return(
		<>
			<img src={tracks[props.idx].cover} className="avatar1" />
			<img src={tracks[props.idx].cover} className="avatar"/>
			<h4 className="name">{tracks[props.idx].artist}</h4>
			<h1 className="title">{tracks[props.idx].name}</h1>
		</>
	);
}
export default Avatar;