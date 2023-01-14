import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import Queue from '../components/Queue'
import SongCard from '../components/SongCard'
import { usePlayerContext } from '../context/PlayerContext'
import { setLocalStorage } from '../hooks/useLocalstorage'

const Album = () => {
	const { id } = useParams()
	const [data, setData] = useState();
	const { handleSongPlayWithQueue } = usePlayerContext()

	useEffect(() => {
		if (id) {
			axios(`http://localhost:5500/album/${id}`, {
				method: 'GET',
			})
				.then((res) => {
					setData(res.data)
					setLocalStorage('album', res.data)
				})
		}
	}, [id]);
	return (
		<>
			<Layout sidebar={true} topbar={true}>
				<section className='px-16 h-full'>
					<div className='h-[32%] w-full flex'>
						<div className='w-[20%] h-full relative py-3'>
							<img className='h-48 w-48 rounded-xl relative z-10' src={data?.image?.includes('-150x150') ? data?.image?.replace('-150x150', '-500x500') : data?.image} alt="" />
							<img className='h-48 w-48 rounded-xl absolute top-0 blur-[8px] z-0 mt-3' src={data?.image?.includes('-150x150') ? data?.image?.replace('-150x150', '-500x500') : data?.image} alt="" />
						</div>
						<div className='w-[80%]'>
							<h1 className='mt-7 text-4xl font-bold text-white' dangerouslySetInnerHTML={{ __html: data?.title }}></h1>
							<p className='mt-4 capitalize text-xl text-white' dangerouslySetInnerHTML={{ __html: `${data?.type} - ${data?.subtitle}` }}></p>
							<p className='text-white'>Songs: {data?.list?.length}</p>
							<button onClick={() => { handleSongPlayWithQueue(data?.list.map((item, listIndex) => { return { ...item, index: listIndex } })) }} className='outline-none px-3 py-2 bg-white text-white rounded-lg bg-opacity-10 hover:bg-opacity-[0.15] duration-150 font-bold w-[120px] mt-4'>Play</button>
						</div>
					</div>
					<div className='mt-8 h-[48%] overflow-auto'>
						{
							data?.list?.map((song, index) => {
								return <SongCard data={{ ...song, index }} key={song.id} index={index + 1} list={data?.list.map((item, listIndex) => { return { ...item, index: listIndex } })} />
							})
						}
					</div>
				</section>
			</Layout>
		</>
	)
}

export default Album