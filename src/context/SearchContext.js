import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";



const SearchContext = createContext();

export function SearchContextProvider({ children }) {

	const [focus, setFocus] = useState(false)
	let source = axios.CancelToken.source()
	const [search, setSearch] = useState('')
	const [placeholderSearchData, setPlaceholderSearchData] = useState();
	const [searchData, setSearchData] = useState();
	const [songsPage, setSongsPage] = useState(1);
	const [albumsPage, setAlbumsPage] = useState(1);
	const [playlistPage, setPlaylistPage] = useState(1);

	useEffect(() => {
		if (focus) {
			axios('https://musify-backend.vercel.app/trending-search', {
				method: "GET"
			})
				.then((res) => {
					setPlaceholderSearchData(res.data)
				})
		}
	}, [focus]);

	useEffect(() => {
		let unmount = false
		if (search.length >= 1) {
			const finalURL = `https://musify-backend.vercel.app/search`;
			const songURL = `https://musify-backend.vercel.app/song`
			axios(finalURL, {
				method: 'POST',
				cancelToken: source.token,
				data: { query: search }
			})
				.then((res) => {
					if (!unmount) {
						axios(songURL, {
							method: 'POST',
							cancelToken: source.token,
							data: { query: search, page: 1 }
						})
							.then((response) => {
								if (!unmount) {
									let data = { data: response.data.results?.slice(0, 3) }
									setSearchData({ ...res.data, songs: data })
								}
							})
					}
				})

			return () => {
				unmount = true
			}
		} else {
			setSearchData()
		}
	}, [search]);

	return (
		<SearchContext.Provider value={{albumsPage, setAlbumsPage, playlistPage, setPlaylistPage ,songsPage, setSongsPage, setFocus, focus, placeholderSearchData, setPlaceholderSearchData, setSearch, search, searchData, setSearchData }}>
			{children}
		</SearchContext.Provider>
	);
}

export function useSearchContext() {
	return useContext(SearchContext);
}
