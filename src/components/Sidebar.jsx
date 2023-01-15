import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import GearIcon from '../icons/GearIcon'
import HomeIcon from '../icons/HomeIcon'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthContext } from '../context/Auth';
import { auth, db } from '../configurations/firebase';
import AddIcon from '../icons/AddIcon'
import { collection, addDoc } from "firebase/firestore";
import HeartIcon from './HeartIcon';
import { RiPlayListFill } from 'react-icons/ri'
import LoginIcon from '../icons/LoginIcon';

const Sidebar = () => {
	const location = useLocation();
	const { user, setUser, userPlaylists } = useAuthContext();
	const provider = new GoogleAuthProvider();
	const [loading, setLoading] = useState(false);
	const routes = [
		{
			icon: <HomeIcon />,
			path: '/',
			label: "Home"
		},
		{
			icon: <GearIcon />,
			path: '/settings',
			label: "Settings"
		},
		// {
		// 	icon: <GearIcon />,
		// 	path: '/login',
		// 	label: "Login"
		// }
	]

	const handleGoogleSignIn = () => {
		setLoading(true)
		signInWithPopup(auth, provider)
			.then((result) => {
				const user = result.user;
				setLoading(false)
				setUser(user)
			}).catch((error) => {
				const errorCode = error.code;
				setLoading(false)
				const errorMessage = error.message;
				const email = error.email;
				const credential = GoogleAuthProvider.credentialFromError(error);
			});
	}

	const addPlaylist = async () => {
		if (user) {
			const docRef = await addDoc(collection(db, "PLAYLIST"), {
				title: "Music",
				image: "",
				subtitle: "My Playlist",
				list: [],
				type: "Playlist",
				uid: user?.uid
			})
				.then(() => {
					alert('Created')
				})
		}
	}

	return (
		<>
			<div className='w-[20vw] h-screen bg-white bg-opacity-[0.07] backdrop:blur-md fixed top-0 left-0 text-white overflow-hidden'>
				<div>
					<p className='text-3xl italic font-semibold text-center tracking-widest py-10 pb-6'>musify</p>
				</div>
				<h3 className='px-16 text-gray-200 font-light'>Menu</h3>
				<div className='grid grid-cols-1 gap-y-2 mt-3'>
					{
						routes.map((item) => {
							if (location.pathname === item.path) {
								return <Link key={item.path} to={item.path} className="text-lg justify-center px-12 flex items-center gap-4 font-semibold py-2 relative route-active"><div className='flex items-center gap-5 w-9/12'><span className='font-bold stroke-2'>{item.icon}</span><p>{item.label}</p></div></Link>
							} else {
								return <Link to={item.path} key={item.path} className="text-lg justify-center px-12 flex items-center gap-4 font-semibold py-2 relative text-gray-400"><div className='flex items-center gap-5 w-9/12'><span className='font-bold stroke-2'>{item.icon}</span><p>{item.label}</p></div></Link>
							}
						})
					}
					<div onClick={handleGoogleSignIn} className={loading ? "animate-pulse text-lg justify-center px-12 flex items-center gap-4 font-semibold py-2 relative cursor-pointer" : "cursor-pointer text-lg justify-center px-12 flex items-center gap-4 font-semibold py-2 relative"}><div className='flex items-center gap-5 w-9/12'><span className='font-bold stroke-2'>{<LoginIcon />}</span><p>{"Login"}</p></div></div>
					<div className='mt-4'>
						<span className='flex justify-between items-center px-16'>
							<h3 className=' text-gray-200 font-light'>Musify Playlist</h3>
							<span onClick={addPlaylist}><AddIcon /></span>
						</span>
					</div>
					<div>
						<Link key={"playlist.image"} to={`/liked-songs`} className={location.pathname == "/liked-songs" ? "text-white text-lg justify-center px-12 flex items-center gap-4 font-semibold py-2 relative route-active" : "text-gray-400  text-lg justify-center px-12 flex items-center gap-4 font-semibold py-2 relative"}><div className='flex items-center gap-5 w-9/12'><span className='font-bold stroke-2'>{<HeartIcon />}</span><p>{"Liked Songs"}</p></div></Link>
						{
							userPlaylists?.map((playlist) => {
								if (location.pathname.includes(playlist.id)) {
									return <Link key={playlist.image} to={`/u/playlist/${playlist.id}`} className="text-white text-lg justify-center px-12 flex items-center gap-4 font-semibold py-2 relative route-active"><div className='flex items-center gap-5 w-9/12'><span className='font-bold stroke-2'>{<RiPlayListFill />}</span><p className='text-ellipsis whitespace-nowrap w-[90%] overflow-hidden'>{playlist.title}</p></div></Link>
								} else {
									return <Link key={playlist.image} to={`/u/playlist/${playlist.id}`} className="text-gray-400 text-lg justify-center px-12 flex items-center gap-4 font-semibold py-2 relative"><div className='flex items-center gap-5 w-9/12'><span className='font-bold stroke-2'>{<RiPlayListFill />}</span><p className='text-ellipsis whitespace-nowrap w-[90%] overflow-hidden'>{playlist.title}</p></div></Link>
								}
							})
						}
					</div>
				</div>
			</div>
		</>
	)
}

export default Sidebar
