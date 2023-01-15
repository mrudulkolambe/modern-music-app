import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSearchContext } from '../context/SearchContext'
import { useOnClickOutside } from '../hooks/useClickOutside'
import SearchCard from './SearchCard'

const SearchResult = () => {
	const { focus, placeholderSearchData, setFocus, searchData } = useSearchContext()

	const searchTabRef = useRef(null)
	useOnClickOutside(searchTabRef, () => { setFocus(false) }, "searchRef")
	return (
		<>
			<div ref={searchTabRef} className={!focus ? "h-0 w-0 duration-300 z-[20] fixed top-20 left-[24vw] overflow-hidden" : 'duration-300 animating-style bg-white z-[20] fixed top-20 left-[24vw] rounded-xl bg-opacity-10 backdrop-blur-xl overflow-hidden'}>
				<div className={!focus ? 'h-0 w-0' : "px-6 p-5 fade-in-focus bg-white bg-opacity-5"}>
					<div className={!searchData ? 'w-full' : "hidden"}>
						<div className='flex items-center justify-between mb-4'>
							<h1 className='text-gray-200 text-sm font-light uppercase'>Trending</h1>
						</div>
						<div className='grid grid-cols-4 gap-3 '>
							{
								placeholderSearchData?.filter((data) => {
									return data?.type !== "song"
								})?.map((data, index) => {
									return <SearchCard key={data?.id + index} data={data} />
								})
							}
						</div>
					</div>
					<div className={searchData ? 'w-full grid grid-cols-4 gap-x-6' : "hidden"}>
						<div>
							<div className='flex items-center justify-between mb-4'>
								<h1 className='text-gray-200 text-sm font-light uppercase'>Songs</h1>
								<Link className='text-xs font-bold mr-7 text-white' to="/search/songs">Show All</Link>
							</div>
							<div className='grid grid-cols-1 gap-y-3'>
								{
									searchData?.songs?.data.map((item, index) => {
										return <SearchCard key={item?.id + index} data={item} />
									})
								}
							</div>
						</div>
						<div>
							<div className='flex items-center justify-between mb-4'>
								<h1 className='text-gray-200 text-sm font-light uppercase'>Albums</h1>
								<Link className='text-xs font-bold mr-7 text-white' to="/search/albums">Show All</Link>
							</div>
							<div className='grid grid-cols-1 gap-y-3'>
								{
									searchData?.albums?.data.map((item, index) => {
										return <SearchCard key={item?.id + index} data={item} />
									})
								}
							</div>
						</div>
						<div className={searchData?.playlists?.data?.length == 0 ? 'hidden' : "block"}>
							<div className='flex items-center justify-between mb-4'>
								<h1 className='text-gray-200 text-sm font-light uppercase'>Playlists</h1>
								<Link className='text-xs font-bold mr-7 text-white' to="/search/playlists">Show All</Link>
							</div>
							<div className='grid grid-cols-1 gap-y-3'>
								{
									searchData?.playlists?.data.map((item, index) => {
										return <SearchCard key={item?.id + index} data={item} />
									})
								}
							</div>
						</div>
						{/* <div>
							<div className='flex items-center justify-between mb-4'>
								<h1 className='text-gray-200 text-sm font-light uppercase'>Top Results</h1>
							</div>
							<div className='grid grid-cols-1 gap-y-3'>
								{
									searchData?.topquery?.data.map((item, index) => {
										return <SearchCard key={item?.id + index} data={item} />
									})
								}
							</div>
						</div> */}
					</div>
					{/* <div className='w-full h-20 bg-orange-200'></div> */}
				</div>
			</div>
		</>
	)
}

export default SearchResult