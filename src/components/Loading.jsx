import React from 'react'

const Loading = ({loading}) => {
  return (
	<>
		<div className={loading ? 'opacity-100 fixed top-0 left-[20vw] h-[84vh] w-[80vw] bg-white z-[2000]' : 'opacity-0 pointer-events-none fixed top-0 left-[20vw] h-[84vh] w-[80vw] bg-white z-[2000]'}></div>
	</>
  )
}

export default Loading
