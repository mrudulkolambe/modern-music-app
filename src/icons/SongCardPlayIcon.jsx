import React from 'react'

const SongCardPlayIcon = ({ stroke = 2, color, size=1 }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={stroke} stroke="currentColor" className={`w-[${size}rem] h-[${size}rem]`}>
			<path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
		</svg>
	)
}

export default SongCardPlayIcon