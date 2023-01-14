import React from 'react'

const PauseIcon = ({ stroke = 4}) => {
	return (
		<span className='h-9 w-9 bg-gray-400 bg-opacity-30 flex items-center justify-center rounded-full cursor-pointer'>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={stroke} stroke="currentColor" className="w-5 h-5">
				<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
			</svg>
		</span>
	)
}

export default PauseIcon