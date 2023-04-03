import React, { useEffect, useRef, useState } from 'react'
import { usePlayerContext } from '../context/PlayerContext';
import SongCardPlayIcon from '../icons/SongCardPlayIcon';
import HeartIcon from './HeartIcon';
import EllipsisIcon from '../icons/EllipsisIcon';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/Auth';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../configurations/firebase';
import { useOnClickOutside } from '../hooks/useClickOutside';

const SongCard = ({ data, index, list }) => {
	const contextMenuRef = useRef(null)
	const [artists, setArtists] = useState("");
	const { user, likedSongsID, likedSongs, userPlaylists } = useAuthContext();
	const { setCurrentSong, setQueue, currentSong, formatDuration, queue } = usePlayerContext();
	const [isPlaying, setIsPlaying] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [showContextMenu, setShowContextMenu] = useState(false);
	const [isQueued, setIsQueued] = useState(false);

	useEffect(() => {
		if (data) {
			let finalArr = data?.more_info.artistMap.primary_artists?.map((artist) => {
				return artist.name
			})
			setArtists(finalArr.join(", "));
			setIsLiked(likedSongsID.includes(data?.id));
			if (data?.id === currentSong?.id) {
				setIsPlaying(true)
			} else {
				setIsPlaying(false)
			}
		}
	}, [data, currentSong, likedSongsID]);

	const handleSetCurrentSong = () => {
		setCurrentSong(data);
		setQueue(list)
	}

	const handleLike = () => {
		if (user) {
			if (isLiked) {
				let removeLikeSongArray = likedSongs?.list?.filter((song) => {
					return song.id != data.id
				})
				const likedSongsRef = doc(db, "Liked-songs", user?.uid);
				updateDoc(likedSongsRef, {
					list: removeLikeSongArray
				})
			} else {
				const likedSongsRef = doc(db, "Liked-songs", user?.uid);
				updateDoc(likedSongsRef, {
					list: arrayUnion(data),
				})
			}
		}
	}

	const handleAddToPlayList = (docRef) => {
		if (user) {
			const playlistRef = doc(db, "PLAYLIST", docRef);
			setShowContextMenu(false)
			updateDoc(playlistRef, {
				list: arrayUnion(data),
			})
		}
	}

	useEffect(() => {
		if (queue, data) {
			let queueID = queue?.map((item) => {
				return item.id
			})
			setIsQueued(queueID?.includes(data?.id))
		}
	}, [queue, data]);

	const handleQueue = () => {
		if (data) {
			if (!isQueued) {
				let currentQueue = [];
				currentQueue = queue;
				currentQueue.push(data)
				setQueue(currentQueue)
				setShowContextMenu(false)
			} else {
				let currentQueue = [];
				currentQueue = queue;
				let finalArr = currentQueue?.filter((item) => {
					return item.id !== data?.id
				})
				setQueue(finalArr)
				setShowContextMenu(false)
			}
		}
	}

	useOnClickOutside(contextMenuRef, () => { setShowContextMenu(false) }, "menuRef")

	return (
		<>
			<div className='relative'>
				<div ref={contextMenuRef} className={showContextMenu ? 'overflow-auto pointer-events-auto gap-2 rounded-lg h-40 absolute top-0 right-10 bg-white bg-opacity-5 text-white backdrop-blur-md z-20 w-64 flex flex-col p-3 text-center' : "hidden"}>
					<span onClick={handleQueue} className='w-full text-center font-semibold cursor-pointer bg-white bg-opacity-5 hover:bg-opacity-10 duration-150 py-1 rounded-md'>{isQueued ? "Remove from Queue" : "Add to Queue"}</span>
					{
						userPlaylists?.map((playlist) => {
							return <span onClick={() => { handleAddToPlayList(`${playlist?.id}`) }} className='w-full text-center font-semibold cursor-pointer bg-white bg-opacity-5 hover:bg-opacity-10 duration-150 py-1 rounded-md'>Add to {playlist?.title}</span>
						})
					}
				</div>
				<div draggable className='z-0 relative hover:bg-white hover:bg-opacity-10 duration-100 rounded-md w-full h-20 flex items-center gap-x-4'>
					<span className='text-sm font-semibold text-gray-300 min-w-[5%] w-[5%] text-center flex justify-center'>{isPlaying ? <SongCardPlayIcon color="#00ff33" /> : `#${index}`}</span>
					<span className='text-xl font-bold text-gray-300 min-w-[7%] w-[7%]'><img className='w-16 h-16 rounded-lg' src={data?.image} alt="" /></span>
					<span className='font-bold text-gray-300 w-[65%] flex items-center'>
						<div className='overflow-hidden w-[60%]'>
							<h3 onClick={handleSetCurrentSong} className={isPlaying ? 'max-w-[50%] cursor-pointer text-lg font-bold text-[#00ff33] w-[50%] whitespace-nowrap text-ellipsis overflow-hidden' : 'max-w-[50%] cursor-pointer text-lg font-bold text-white w-[50%] whitespace-nowrap text-ellipsis overflow-hidden'} dangerouslySetInnerHTML={{ __html: data?.title?.slice(0, 38) }}></h3>
							<span className='max-w-[60%] cursor-pointer text-xs font-normal text-gray-300 flex gap-x-1 w-[60%] whitespace-nowrap text-ellipsis overflow-hidden' dangerouslySetInnerHTML={{ __html: artists.length < 40 ? `${artists.slice(0, 40)}` : `${artists.slice(0, 40)}...` }}></span>
						</div>
						<Link to={`/album/${data?.more_info?.album_id}`} className='font-light text-sm w-[40%] text-ellipsis whitespace-nowrap overflow-hidden hover:underline underline-offset-2 cursor-pointer' dangerouslySetInnerHTML={{ __html: data?.more_info?.album }}></Link>
					</span>
					<div className='w-[23%] grid grid-cols-3 justify-items-center items-center'>
						<span className='text-sm font-bold text-gray-300'>{formatDuration(data?.more_info?.duration)}</span>
						<span className='cursor-pointer text-blue-500' onClick={handleLike}><HeartIcon isLiked={isLiked} /></span>
						<span className='cursor-pointer text-white' onClick={() => { setShowContextMenu(!showContextMenu) }}><EllipsisIcon /></span>
					</div>
				</div>
			</div>
		</>
	)
}

export default SongCard