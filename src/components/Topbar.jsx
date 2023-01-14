import React, { useRef, useState } from 'react'
import { useSearchContext } from '../context/SearchContext'
import SearchResult from './SearchResult'

const Topbar = ({ hideSearchResult }) => {
	const { setFocus, search, setSearch } = useSearchContext()
	return (
		<>
			<div className='fixed top-0 left-[20vw] h-[13vh] w-[80vw] flex items-center px-16'>
				<input id="searchRef" autoComplete='off' onChange={(e) => { setSearch(e.target.value) }} value={search} onFocus={() => { setFocus(true) }} className='text-white bg-white bg-opacity-10 w-96 px-10 py-[0.6rem] rounded-lg backdrop-blur-sm outline-none' placeholder='Search...' />
			</div>
			{!hideSearchResult && <SearchResult />}
		</>
	)
}

export default Topbar