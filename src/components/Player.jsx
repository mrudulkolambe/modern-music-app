import axios from 'axios'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../configurations/firebase'
import { useAuthContext } from '../context/Auth'
import { usePlayerContext } from '../context/PlayerContext'
import LoopIcon from '../icons/LoopIcon'
import { BiFullscreen } from 'react-icons/bi'
import NextIcon from '../icons/NextIcon'
import PauseIcon from '../icons/PauseIcon'
import PlayIcon from '../icons/PlayIcon'
import PreviousIcon from '../icons/PreviousIcon'
import HeartIcon from './HeartIcon'
import { RiPlayListFill } from 'react-icons/ri';

const Player = ({ setShowQueue, showQueue, setShowFullScreen }) => {
	const { likedSongsID, likedSongs, user } = useAuthContext()
	const { currentSong, songData, loopPlayer, setLoopPlayer, handleCurrentTime, duration, playState, setPlayState, handleSongEnd, handleNext, handlePrevious } = usePlayerContext()
	const [artists, setArtists] = useState("");
	const [sourceFile, setSourceFile] = useState("")
	const progressRef = useRef(null)
	const audioPlayer = useRef(null);
	const [isLiked, setIsLiked] = useState(false)
	const location = useLocation()

	useEffect(() => {
		if (currentSong) {
			let finalArr = currentSong?.more_info.artistMap.primary_artists?.map((artist) => {
				return artist.name
			})
			setArtists(finalArr.join(", "))
			setSourceFile(songData?.auth_url);
			if (likedSongsID.includes(currentSong?.id)) {
				setIsLiked(true)
			} else {
				setIsLiked(false)
			}
		}
	}, [currentSong, songData, likedSongsID]);


	function clickEvent(e) {
		var rect = e.target.getBoundingClientRect();
		var x = e.clientX - rect.left;
		const widthPercentage = Math.round(Math.round(Number(x)) / Math.round(Number(e.target.clientWidth)) * 100)
		let finalTime = Math.round(widthPercentage * Number(currentSong.more_info.duration) / 100);
		if (!location.pathname.includes("login")) audioPlayer.current.currentTime = finalTime
	}

	useEffect(() => {
		if (!location.pathname.includes("login")) setPlayState(audioPlayer.current.paused);
	}, [duration]);

	const handleLike = () => {
		if (user) {
			if (isLiked) {
				let removeLikeSongArray = likedSongs?.list?.filter((song) => {
					return song.id != currentSong.id
				})
				const likedSongsRef = doc(db, "Liked-songs", user?.uid);
				updateDoc(likedSongsRef, {
					list: removeLikeSongArray
				})
			} else {
				const likedSongsRef = doc(db, "Liked-songs", user?.uid);
				updateDoc(likedSongsRef, {
					list: arrayUnion(currentSong),
				})
			}
		}
	}

	return (
		<>
			{!location.pathname.includes("login") && <div className='h-[16vh] bottom-0 fixed left-[20vw] w-[80vw] px-16 flex text-white backdrop-blur-md py-4 bg-white bg-opacity-[0.02]'>
				<div className='w-[10%]'>
					<img className='h-24 w-24 rounded-lg' src={currentSong?.image} alt="" />
				</div>
				<div className='w-[89%] h-full flex'>
					<div className='w-[20%] py-3 h-full'>
						<h3 className='w-[85%] text-ellipsis overflow-hidden whitespace-nowrap font-bold text-lg' dangerouslySetInnerHTML={{ __html: currentSong?.title }}></h3>
						<p className='mt-4 text-gray-300 text-sm w-[85%] text-ellipsis overflow-hidden whitespace-nowrap' dangerouslySetInnerHTML={{ __html: artists }}></p>
					</div>
					<div className='w-[80%] '>
						<div className='flex items-center px-10'>
							<div className='h-10 flex items-center mb-3 relative cursor-pointer'>
								<span className={showQueue ? 'text-white' : 'text-gray-500'} onClick={() => { setShowQueue(!showQueue) }}>
									<RiPlayListFill />
								</span>
							</div>
							<div className='justify-center w-1/2 h-10 m-auto flex items-center gap-10 mb-3'>
								<span onClick={handleLike} className='text-[rgba(255,255,255,0.3)] hover:text-[rgba(255,255,255,0.7)] duration-150'><HeartIcon isLiked={isLiked} /></span>
								<div onClick={handlePrevious}><PreviousIcon /></div>
								<div>{playState ? <div onClick={() => { audioPlayer.current.play() }}><PlayIcon /></div> : <div onClick={() => { audioPlayer.current.pause() }}><PauseIcon /></div>}</div>
								<div onClick={handleNext}><NextIcon /></div>
								<span className={!loopPlayer ? 'text-white text-[rgba(255,255,255,0.3)] hover:text-[rgba(255,255,255,0.7)] duration-150' : 'text-[rgba(255,255,255,0.7)'} onClick={() => { setLoopPlayer(!loopPlayer) }}><LoopIcon /></span>
							</div>
							<div className='h-10 flex items-center mb-3 relative cursor-pointer'>
								<span className='text-gray-400 hover:text-white duration-150' onClick={() => { setShowFullScreen(true) }}>
									<BiFullscreen />
								</span>
							</div>
						</div>
						<div>
							<audio loop={loopPlayer} id='audioplayer' onEnded={handleSongEnd} ref={audioPlayer} onTimeUpdate={handleCurrentTime} controls src={sourceFile} className="hidden" type="mp4" autoPlay />
							<div className='grid grid-cols-12 h-10 w-full bg-white bg-opacity-[0.08] rounded-lg items-center'>
								<span className='col-span-1 text-center text-xs'>{duration?.currentTime}</span>
								<div className='col-span-10'>
									<div ref={progressRef} onDragStart={clickEvent} onClick={clickEvent} className='cursor-pointer w-full h-1 bg-gray-200 rounded-lg relative glow' width={duration?.progress}>
										<span style={{ width: `${duration?.progress}%` }} className='absolute top-0 left-0 h-full rounded-lg bg-blue-500'></span>
									</div>
								</div>
								<span className='col-span-1 text-center text-xs'>{duration?.duration}</span>
							</div>
						</div>
					</div>
				</div>
			</div>}
		</>
	)
}

export default Player
