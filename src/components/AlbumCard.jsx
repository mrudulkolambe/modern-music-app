import React from 'react'
import { Link } from 'react-router-dom'

const AlbumCard = ({ data, index }) => {
	return (
		<>
			<div className='flex gap-6 p-3 rounded-lg cursor-pointer w-full hover:bg-white hover:bg-opacity-10 duration-150'>
				<div className='flex items-center w-fit'>
					<h3 className='font-semibold text-lg text-white'>#{index}</h3>
				</div>
				<Link to={`/album/${data?.id}`} className='w-fit'>
					<img className='h-20 w-20 rounded-lg' src={data?.image} alt="" />
				</Link>
				<Link to={`/album/${data?.id}`} className='w-10/12 py-3'>
					<h1 className='font-bold text-lg text-white' dangerouslySetInnerHTML={{ __html: data?.title.length < 30 ? data?.title : `${data?.title.slice(0, 30)}...` }}></h1>
					<p className='text-sm mt-1 text-gray-300' dangerouslySetInnerHTML={{ __html: data?.subtitle.length <= 50 ? data?.subtitle : `${data?.subtitle.slice(0, 50)}...` }}></p>
				</Link>
			</div>
		</>
	)
}

export default AlbumCard