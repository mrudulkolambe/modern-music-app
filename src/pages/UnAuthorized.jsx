import React from 'react'
import { useNavigate } from 'react-router-dom'

const UnAuthorized = () => {
	const navigate = useNavigate()
	return (
		<>
			<div className='flex flex-col items-center justify-center h-screen w-screen'>
				<h1 className='text-4xl text-white font-semibold'>Seems like this playlist doesn't belongs to you!</h1>
				<button onClick={() => {navigate("/")}} className='mt-3 w-44 bg-white bg-opacity-10 px-3 py-2 text-white font-semibold rounded-lg hover:bg-opacity-20 duration-200'>Back</button>
			</div>
		</>
	)
}

export default UnAuthorized