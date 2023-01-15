import React, { useEffect, useRef, useState } from 'react'
import { getLocalStorage } from '../hooks/useLocalstorage'
import SongCard from './SongCard';
import { IoClose } from 'react-icons/io5'
import { useOnClickOutside } from '../hooks/useClickOutside';
import { usePlayerContext } from '../context/PlayerContext';

const Queue = ({ setShowQueue }) => {
	const { queue } = usePlayerContext()
	const queueRef = useRef()
	useOnClickOutside(queueRef, () => { setShowQueue(false) }, "queue")
	const [songs, setSongs] = useState([]);
	const [result, setResult] = useState([])
	useEffect(() => {
		if (queue) {
			setSongs(queue)
			setResult(queue)
		} else {
			setSongs([])
		}
	}, []);

	const handleSearch = (query) => {
		let finalResult = songs?.filter((item) => {
			return item?.title.toLowerCase().includes(query)
		})
		setResult(finalResult)
	}

	useEffect(() => {
		if (queue) {
			setResult(queue)
		}
	}, [queue]);
	return (
		<>
			<div ref={queueRef} id="queue" className='px-10 pt-10 bg-black bg-opacity-5 backdrop-blur-2xl overflow-auto z-50 absolute top-0 left-[20vw] h-[84vh] w-[80vw]'>
				<div className='px-5 h-[10%] flex items-center gap-20 justify-between'>
					<div className='flex items-center gap-20'>
						<h2 className='text-4xl text-white font-semibold'>Queue</h2>
						<input type="text" onChange={(e) => { handleSearch(e.target.value.toLowerCase()) }} className={'w-96 px-8 py-2 bg-white bg-opacity-10 rounded-lg outline-none text-white text-sm h-[40px]'} placeholder={"Search Songs..."} />
					</div>
					<span onClick={() => { setShowQueue(false) }} className='cursor-pointer hover:bg-opacity-10 duration-200 text-white p-2 bg-white bg-opacity-5 rounded-full'>
						<IoClose />
					</span>
				</div>
				<div className='h-[90%] overflow-auto'>
					{result.map((song, index) => {
						return <SongCard data={{ ...song, index }} key={song.id} index={index + 1} list={songs?.map((item, listIndex) => { return { ...item, index: listIndex } })} />
					})}
				</div>
			</div>
		</>
	)
}

export default Queue