import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import SongCard from '../components/SongCard';
import { useSearchContext } from '../context/SearchContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import AlbumCard from '../components/AlbumCard';
import { Link } from 'react-router-dom';

const AlbumSearch = () => {
	const { search, albumsPage, setAlbumsPage, setFocus } = useSearchContext();
	let source = axios.CancelToken.source();
	const [albums, setAlbums] = useState([]);
	const [dataState, setDataState] = useState(0)

	useEffect(() => {
		setFocus(false)
		let unmount = false
		if (search.length >= 1) {
			const albumURL = `http://localhost:5500/album`
			axios(albumURL, {
				method: 'POST',
				cancelToken: source.token,
				data: { query: search, page: 1 }
			})
				.then((res) => {
					if (!unmount) {
						setAlbums(res.data.results);
						setAlbumsPage(albumsPage + 1)
					}
				})
			return () => {
				unmount = true
			}
		}
	}, [search]);

	const fetchData = () => {
		axios('http://localhost:5500/album', {
			method: "POST",
			data: { query: search, page: albumsPage }
		})
			.then((res) => {
				setAlbums(albums?.concat(res.data?.results));
				setAlbumsPage(albumsPage + 1)
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
							<Link to={'/search/albums'} className={'text-lg cursor-pointer font-semibold mt-5 text-white'}>Albums</Link>
							<Link to={'/search/playlists'} className={'text-lg cursor-pointer font-semibold mt-5 text-gray-400'}>Playlists</Link>
						</div>
						<div id="ALBUMINFINITESCROLL" className={dataState === 0 ? 'overflow-auto mt-5 grid grid-cols-1 gap-3 h-[60vh] pb-5' : "hidden"}>
							<InfiniteScroll
								dataLength={albums?.length || 0}
								next={() => { fetchData() }}
								inverse={false} //
								hasMore={true}
								loader={<h4>Loading...</h4>}
								scrollableTarget="ALBUMINFINITESCROLL"
							>
								{
									albums?.map((album, index) => {
										return <AlbumCard data={{ ...album, index }} key={"album" + index} index={index + 1} />
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

export default AlbumSearch
