import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlayerContext } from '../context/PlayerContext'

const Card = ({ data }) => {
	const [link, setLink] = useState("")
	const navigate = useNavigate()
	const { setCurrentSong } = usePlayerContext();

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
		} else {
			navigate(link)
		}
	}
	return (
		<>
			<div onClick={handleClick} className='cursor-pointer select-none w-36 rounded-lg overflow-hidden'>
				<img className='min-h-[9rem] min-w-[9rem] h-36 w-36 rounded-xl' src={data?.image} alt="" />
				<div className='text-white mt-2 px-1'>
					<p className='text-sm font-bold w-32 overflow-hidden whitespace-nowrap text-ellipsis' dangerouslySetInnerHTML={{ __html: data?.title }}></p>
					<p className='text-xs text-gray-300 font-light capitalize'>{data?.type}</p>
				</div>
			</div>
		</>
	)
}

export default Card