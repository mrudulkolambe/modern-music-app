import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import SongCard from '../components/SongCard';
import { useSearchContext } from '../context/SearchContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';

const Search = () => {
	const { search, songsPage, setSongsPage, setFocus } = useSearchContext();
	let source = axios.CancelToken.source();
	const [songs, setSongs] = useState([]);
	const [dataState, setDataState] = useState(0)

	useEffect(() => {
		setFocus(false)
		let unmount = false
		if (search.length >= 1) {
			const songURL = `https://musify-backend.vercel.app/song`
			axios(songURL, {
				method: 'POST',
				cancelToken: source.token,
				data: { query: search, page: 1 }
			})
				.then((res) => {
					if (!unmount) {
						setSongs(res.data.results);
						setSongsPage(songsPage + 1)
					}
				})
			return () => {
				unmount = true
			}
		}
	}, [search]);

	const fetchData = () => {
		axios('https://musify-backend.vercel.app/song', {
			method: "POST",
			data: { query: search, page: songsPage }
		})
			.then((res) => {
				setSongs(songs?.concat(res.data?.results));
				setSongsPage(songsPage + 1)
			})
	}
	return (
		<>
			<Layout sidebar={true} topbar={true} hideSearchResult={true}>
				<section className='px-16 h-full'>
					<h1 className='text-4xl text-white font-semibold'>Search Result for &ldquo;{search}&rdquo;</h1>
					<div>
						<div className='flex gap-16'>
							<Link to={'/search/songs'} className={'text-lg cursor-pointer font-semibold mt-5 text-white'}>Songs</Link>
							<Link to={'/search/albums'} className={'text-lg cursor-pointer font-semibold mt-5 text-gray-400'}>Albums</Link>
							<Link to={'/search/playlists'} className={'text-lg cursor-pointer font-semibold mt-5 text-gray-400'}>Playlists</Link>
						</div>
						<div id="SONGSINFINITESCROLL" className={dataState === 0 ? 'overflow-auto mt-5 grid grid-cols-1 gap-3 h-[60vh] pb-5' : "hidden"}>
							<InfiniteScroll
								dataLength={songs?.length || 0}
								next={() => { fetchData() }}
								inverse={false} //
								hasMore={true}
								loader={<h4>Loading...</h4>}
								scrollableTarget="SONGSINFINITESCROLL"
							>
								{
									songs?.map((song, index) => {
										return <SongCard data={{ ...song, index }} key={"song" + index} index={index + 1} list={[]} />
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

export default Search
