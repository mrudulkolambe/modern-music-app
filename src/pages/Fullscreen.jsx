import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuthContext } from '../context/Auth'
import { usePlayerContext } from '../context/PlayerContext'
import NextIcon from '../icons/NextIcon'
import PauseIcon from '../icons/PauseIcon'
import PlayIcon from '../icons/PlayIcon'
import PreviousIcon from '../icons/PreviousIcon';
import { BiExitFullscreen } from 'react-icons/bi'

const Fullscreen = ({ setShowFullScreen, fullscreen }) => {
	const { likedSongsID, likedSongs, user } = useAuthContext()
	const { currentSong, songData, formatDuration, queue, setCurrentSong, loopPlayer, setLoopPlayer, duration, playState, handlePrevious, handleNext } = usePlayerContext()
	const location = useLocation()
	// useEffect(() => {
	// 	effect
	// 	return () => {
	// 		cleanup
	// 	};
	// }, [input]);
	return (
		<>
			<div className={fullscreen ? 'px-20 h-screen w-screen fixed top-0 left-0 z-[1000] bg flex flex-col justify-end py-10 opacity-100 duration-75' : 'pointer-events-none px-20 h-screen w-screen fixed top-0 left-0 z-[1000] bg flex flex-col justify-end py-10 opacity-0 duration-75'} >
				<div className={fullscreen ? 'opacity-100 duration-1000 h-[50%] flex w-full items-end' : 'opacity-0 duration-1000 h-[50%] flex w-full items-end'}>
					<div className='flex w-[380px] items-end h-full relative'>
						<img className='h-[350px] select-none rounded-xl absolute z-[100]' src={currentSong?.image?.replace('-150x150', '-500x500')} alt="" />
						<img className='h-[350px] scale-105 rounded-xl absolute blur-lg opacity-40 z-0' src={currentSong?.image?.replace('-150x150', '-500x500')} alt="" />
					</div>
					<div className='w-[70%] pb-0'>
						<h1 className='font-bold text-6xl text-white' dangerouslySetInnerHTML={{ __html: currentSong?.title }}></h1>
						<h1 className='font-semibold text-gray-300' dangerouslySetInnerHTML={{ __html: currentSong?.subtitle.length < 55 ? currentSong?.subtitle : `${currentSong?.subtitle?.slice(0, 55)}...` }}></h1>
					</div>
				</div>
				<div className={fullscreen ? 'opacity-100 duration-1000 py-3 h-[20%] mt-10' : 'opacity-0 duration-1000 py-3 h-[20%] mt-10'}>
					<div className=''>
						<div className='items-center grid grid-cols-12 h-10 w-full bg-white rounded-lg bg-opacity-10'>
							<span className='col-span-1 text-center text-white text-sm'>{duration?.currentTime}</span>
							<span className='glow col-span-10 text-center text-white text-sm h-1.5 rounded-lg bg-white bg-opacity-30 relative'>
								<span className='progress-bar absolute top-0 left-0 h-full rounded-lg bg-blue-500'></span>
							</span>
							<span className='col-span-1 text-center text-white text-sm'>{duration?.duration}</span>
						</div>
						<div className='flex justify-between w-full items-center mt-10 '>
							<span className='text-gray-400 cursor-pointer hover:bg-white duration-150 text-2xl' onClick={() => { setShowFullScreen(false) }}><BiExitFullscreen /></span>
							<div className='text-white flex items-center justify-center scale-150 gap-10 text-7xl'>
								<div onClick={handlePrevious}><PreviousIcon /></div>
								<div className='text-white'>{playState ? <div onClick={() => { document.getElementById('audioplayer').play() }}><PlayIcon /></div> : <div onClick={() => { document.getElementById('audioplayer').pause() }}><PauseIcon /></div>}</div>
								<div onClick={handleNext}><NextIcon /></div>
							</div>
							<span className='text-gray-400 cursor-pointer hover:text-white duration-150 text-2xl' onClick={() => { setShowFullScreen(false) }}><BiExitFullscreen /></span>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Fullscreen