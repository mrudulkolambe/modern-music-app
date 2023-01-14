import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { usePlayerContext } from '../context/PlayerContext';
import { useSearchContext } from '../context/SearchContext';
import SongCardPlayIcon from '../icons/SongCardPlayIcon';

const SearchCard = ({ data }) => {
	const [link, setLink] = useState("")
	const [hover, setHover] = useState(false)
	const { setFocus } = useSearchContext();
	const { setCurrentSong } = usePlayerContext();
	const navigate = useNavigate();
	
	useEffect(() => {
		if (data?.type === 'playlist') {
			setLink(`/playlist/${data?.id}`)
		} else if (data?.type === "album") {
			setLink(`/album/${data?.id}`)
		}
	}, [data]);

	const handleClick = () => {
		if (data?.type === "song") {
			setCurrentSong(data);
			setFocus(false)
		} else {
			setFocus(false);
			navigate(link)
		}
	}

	return (
		<>
			<div onClick={handleClick} onMouseOver={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }} className='cursor-pointer w-full flex gap-x-3'>
				<div className='relative h-[3.5vw] w-[3.5vw] min-w-[3.5vw]'>
					{data?.type === "song" && hover && <div className='h-full w-full absolute top-0 rounded-lg left-0 z-20 bg-black bg-opacity-70 flex items-center justify-center text-white'><SongCardPlayIcon size={1.5} /></div>}
					<img src={data?.image} className='h-full w-full absolute top-0 left-0 rounded-lg z-10' alt="" />
				</div>
				<div className='py-1 w-[80%]'>
					<p className='text-white font-semibold w-[80%] whitespace-nowrap text-ellipsis overflow-hidden' dangerouslySetInnerHTML={{ __html: data?.title }}></p>
					<p className='text-white text-sm font-light capitalize'>{data?.type}</p>
				</div>
			</div>
		</>
	)
}

export default SearchCard