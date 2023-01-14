import React from 'react'

const PlayIcon = ({ stroke = 2 }) => {
	return (
		<span className='h-9 w-9 bg-gray-400 bg-opacity-30 flex items-center justify-center rounded-full cursor-pointer'>
			<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={stroke} stroke="currentColor" className="ml-0.5 w-5 h-5">
				<path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
			</svg>
		</span>
	)
}

export default PlayIcon