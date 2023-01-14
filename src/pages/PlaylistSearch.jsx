import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useSearchContext } from '../context/SearchContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import PlaylistCard from '../components/PlaylistCard'
import { Link } from 'react-router-dom';

const PlaylistSearch = () => {
	const { search, setPlaylistPage, playlistPage, setFocus } = useSearchContext();
	let source = axios.CancelToken.source();
	const [playlists, setPlaylists] = useState([]);
	const [dataState, setDataState] = useState()
	useEffect(() => {
		setFocus(false)
		let unmount = false
		if (search.length >= 1) {
			const playlistURL = `https://musify-backend.vercel.app/playlist`
			axios(playlistURL, {
				method: 'POST',
				cancelToken: source.token,
				data: { query: search, page: 1 }
			})
				.then((res) => {
					if (!unmount) {
						setDataState(res.data)
						setPlaylists(res.data.results);
						setPlaylistPage(playlistPage + 1)
					}
				})
			return () => {
				unmount = true
			}
		}
	}, [search]);

	const fetchData = () => {
		axios('https://musify-backend.vercel.app/playlist', {
			method: "POST",
			data: { query: search, page: playlistPage }
		})
			.then((res) => {
				setPlaylists(playlists?.concat(res.data?.results));
				setPlaylistPage(playlistPage + 1)
			})
	}
	return (
		<>
			<Layout sidebar={true} topbar={true} hideSearchResult={true}>
				<section className='px-16 h-full'>
					<h1 className='text-4xl text-white font-semibold'>Search Result for &ldquo;{search}&rdquo;</h1>
					<div>
						<div className='flex gap-16'>
							<Link to={'/search/songs'} className={'text-lg cursor-pointer font-semibold mt-5 text-gray-400'}>Songs</Link>
							<Link to={'/search/albums'} className={'text-lg cursor-pointer font-semibold mt-5 text-gray-400'}>Albums</Link>
							<Link to={'/search/playlists'} className={'text-lg cursor-pointer font-semibold mt-5 text-white'}>Playlists</Link>
						</div>
						<div id="PLAYLISTINFINITESCROLL" className={dataState === 0 ? 'overflow-auto mt-5 grid grid-cols-1 gap-3 h-[60vh] pb-5' : "hidden"}>
							<InfiniteScroll
								dataLength={playlists?.length || 0}
								next={() => { fetchData() }}
								inverse={false} //
								hasMore={true}
								loader={<h4>Loading...</h4>}
								scrollableTarget="PLAYLISTINFINITESCROLL"
							>
								{
									playlists?.map((playlist, index) => {
										return <PlaylistCard data={{ ...playlist, index }} key={"playlist" + index} index={index + 1} />
									})
								}
							</InfiniteScroll>
						</div>
					</div>
				</section>
			</Layout>
		</>
	)
}

export default PlaylistSearch
