import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import SongCard from '../components/SongCard'
import { usePlayerContext } from '../context/PlayerContext'
import { deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from '../configurations/firebase'
import { useAuthContext } from '../context/Auth'
import HeartIcon from '../components/HeartIcon'

const Playlist = ({ isUserPlaylist, isLikedSongs }) => {
	const { handleSongPlayWithQueue } = usePlayerContext();
	const { likedSongs, user } = useAuthContext()
	const navigate = useNavigate()
	const { id } = useParams()
	const [data, setData] = useState();
	const [showButton, setShowButton] = useState(false)
	const initialPlaylistData = {
		title: "Music",
		subtitle: "User Playlist"
	}
	const [playlistData, setPlaylistData] = useState(initialPlaylistData)

	const handleChange = (e) => {
		setShowButton(true)
		setPlaylistData({
			...playlistData,
			[e.target.name]: e.target.value
		})
	}

	useEffect(() => {
		if (isUserPlaylist && user) {
			const unsub = onSnapshot(doc(db, "PLAYLIST", id), (doc) => {
				console.log(doc.data().uid === user?.uid)
				if (doc?.data().uid === user?.uid) {
					setData({ ...doc.data(), id });
					setPlaylistData({
						title: doc.data().title,
						subtitle: doc.data().subtitle
					})
				} else {
					navigate("/unauthorized")
				}
			});
		} else if (isLikedSongs) {
			if (likedSongs) {
				setData({ ...likedSongs, id: likedSongs.uid });
			}
		} else {
			axios(`https://musify-backend.vercel.app/playlist/${id}`, {
				method: 'GET',
			})
				.then((res) => {
					setData(res.data)
				})
		}
	}, [id, isUserPlaylist, likedSongs, isLikedSongs, user]);

	const updatePlaylistData = async () => {
		if (id) {
			const docRef = doc(db, "PLAYLIST", id);
			await updateDoc(docRef, playlistData)
				.then(() => {
					setShowButton(false)
				})
				.catch((err) => {
					setShowButton(false)
				})
		}
	}

	const sharePlaylist = (e) => {
		if (isUserPlaylist) {
			e.target.innerText = "Copied!";
			navigator.clipboard.writeText(`${window.location.origin}/clone/${id}`);
			setTimeout(() => {
				e.target.innerText = "Share"
			}, 1000)
		}
	}

	const handleDelete = async () => {
		await deleteDoc(doc(db, "PLAYLIST", id))
			.then(() => {
				navigate("/")
			})
	}

	return (
		<>
			<Layout sidebar={true} topbar={true}>
				<section className='px-16 h-full'>
					<div className='h-[32%] w-full flex'>
						{!isLikedSongs ? <div className='w-[20%] h-full relative py-3'>
							<img className='h-48 w-48 rounded-xl relative z-10' src={data?.image?.includes('-150x150') ? data?.image?.replace('-150x150', '-500x500') : data?.image} alt="" />
							<img className='h-48 w-48 rounded-xl absolute top-0 blur-[8px] z-0 mt-3' src={data?.image?.includes('-150x150') ? data?.image?.replace('-150x150', '-500x500') : data?.image} alt="" />
						</div>
							:
							<div className='w-[20%] h-full py-3'>
								<div className='h-48 w-48 rounded-xl bg-white bg-opacity-10'>
									<div className='scale-150'><HeartIcon /></div>
								</div>
								{/* <img className='h-48 w-48 rounded-xl relative z-10' src={data?.image?.includes('-150x150') ? data?.image?.replace('-150x150', '-500x500') : data?.image} alt="" /> */}
								{/* <img className='h-48 w-48 rounded-xl absolute top-0 blur-[8px] z-0 mt-3' src={data?.image?.includes('-150x150') ? data?.image?.replace('-150x150', '-500x500') : data?.image} alt="" /> */}
							</div>
						}
						<div className='w-[80%]'>
							<h1 className='mt-7 text-4xl font-bold text-white' >{isUserPlaylist ? <input type="text" value={playlistData?.title} onChange={handleChange} spellCheck={false} name="title" className="focus:cursor-text cursor-pointer outline-none bg-transparent" /> : data?.title} </h1>
							<p className='mt-4 capitalize text-xl text-white'>{data?.type} - {isUserPlaylist ? <input onChange={handleChange} name="subtitle" spellCheck={false} className='focus:cursor-text cursor-pointer bg-transparent outline-none' value={playlistData?.subtitle} /> : data?.subtitle}</p>
							<p className='text-white'>Songs: {data?.list?.length}</p>
							<div>
								<button onClick={() => { handleSongPlayWithQueue(data?.list.map((item, listIndex) => { return { ...item, index: listIndex } })) }} className='outline-none px-3 py-2 bg-white text-white rounded-lg bg-opacity-10 hover:bg-opacity-[0.15] duration-150 font-bold w-[120px] mt-4'>Play</button>
								<button onClick={updatePlaylistData} className={showButton ? 'outline-none px-3 py-2 bg-white text-white rounded-lg bg-opacity-10 hover:bg-opacity-[0.15] duration-150 font-bold w-[120px] mt-4' : "hidden"}>Update</button>
								{isUserPlaylist && <button onClick={sharePlaylist} className={'outline-none px-3 py-2 bg-white text-white rounded-lg bg-opacity-10 hover:bg-opacity-[0.15] duration-150 font-bold w-[120px] mt-4 ml-3'}>Share</button>}
								{isUserPlaylist && <button onClick={handleDelete} className={'outline-none px-3 py-2 bg-white text-white rounded-lg bg-opacity-10 hover:bg-opacity-[0.15] duration-150 font-bold w-[120px] mt-4 ml-3'}>Delete</button>}
							</div>
						</div>
					</div>
					<div className='mt-8 h-[48%] overflow-auto'>
						{
							data?.list?.map((song, index) => {
								return <SongCard data={{ ...song, index }} key={song.id} index={index + 1} list={data?.list.map((item, listIndex) => { return { ...item, index: listIndex } })} />
							})
						}
					</div>
				</section>
			</Layout>
		</>
	)
}

export default Playlist