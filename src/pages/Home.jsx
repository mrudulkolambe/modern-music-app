import axios from 'axios'
import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '../components/Card'
import Layout from '../components/Layout'
import Sidebar from '../components/Sidebar'
import { useHomeContext } from '../context/Home'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperCore, { Autoplay } from 'swiper';
import { breakpoints } from '../configurations/swiper';


const Home = () => {
	const { homeData } = useHomeContext();
	useEffect(() => {
		SwiperCore.use([Autoplay]);
	}, [homeData]);
	return (
		<>
			<Layout sidebar={true} topbar={true}>
				<section className='px-16 h-[71vh] overflow-auto pb-4'>
					<div>
						<h1 className='text-white text-2xl font-bold'>Discover</h1>
					</div>
					<div className='mt-6'>
						<span>
							<p className='uppercase text-gray-300 text-sm'>Trending Now</p>
						</span>
						<div className='mt-4'>
							<Swiper
								spaceBetween={30}
								slidesPerView={6}
								breakpoints={breakpoints}
							>
								{
									homeData?.new_trending?.map((data) => {
										return <SwiperSlide key={data.id}><Card data={data} /></SwiperSlide>
									})
								}
							</Swiper>
						</div>
						<div>

						</div>
					</div>
					<div className='mt-4'>
						<span>
							<p className='uppercase text-gray-300 text-sm'>New Releases</p>
						</span>
						<div className='mt-4'>
							<Swiper
								spaceBetween={30}
								slidesPerView={6}
								breakpoints={breakpoints}
							>
								{
									homeData?.new_albums?.map((data) => {
										return <SwiperSlide key={data.id}><Card data={data} /></SwiperSlide>
									})
								}
							</Swiper>
						</div>
						<div>

						</div>
					</div>
					<div className='mt-6'>
						<span>
							<p className='uppercase text-gray-300 text-sm'>Top Charts</p>
						</span>
						<div className='mt-4'>
							<Swiper
								spaceBetween={30}
								slidesPerView={6}
								breakpoints={breakpoints}
							>
								{
									homeData?.charts?.map((data) => {
										return <SwiperSlide key={data.id}><Card data={data} /></SwiperSlide>
									})
								}
							</Swiper>
						</div>
						<div>

						</div>
					</div>
					<div className='mt-6'>
						<span>
							<p className='uppercase text-gray-300 text-sm'>Editorial Picks</p>
						</span>
						<div className='mt-4'>
							<Swiper
								spaceBetween={30}
								slidesPerView={6}
								breakpoints={breakpoints}
							>
								{
									homeData?.top_playlists?.map((data) => {
										return <SwiperSlide key={data.id}><Card data={data} /></SwiperSlide>
									})
								}
							</Swiper>
						</div>
						<div>

						</div>
					</div>
					<div className='mt-6'>
						<span>
							<p className='uppercase text-gray-300 text-sm'>What's Hot</p>
						</span>
						<div className='mt-4'>
							<Swiper
								spaceBetween={30}
								slidesPerView={6}
								breakpoints={breakpoints}
							>
								{
									homeData?.city_mod?.map((data) => {
										return <SwiperSlide key={data.id}><Card data={data} /></SwiperSlide>
									})
								}
							</Swiper>
						</div>
						<div>

						</div>
					</div>
					<div className='mt-6'>
						<span>
							<p className='uppercase text-gray-300 text-sm'>Top Genres & Moods</p>
						</span>
						<div className='mt-4'>
							<Swiper
								spaceBetween={30}
								slidesPerView={6}
								breakpoints={breakpoints}
							>
								{
									homeData?.["promo:vx:data:76"]?.map((data) => {
										return <SwiperSlide key={data.id}><Card data={data} /></SwiperSlide>
									})
								}
							</Swiper>
						</div>
						<div>

						</div>
					</div>
					<div className='mt-6'>
						<span>
							<p className='uppercase text-gray-300 text-sm'>Top Albums</p>
						</span>
						<div className='mt-4'>
							<Swiper
								spaceBetween={30}
								slidesPerView={6}
								breakpoints={breakpoints}
							>
								{
									homeData?.["promo:vx:data:116"]?.map((data) => {
										return <SwiperSlide key={data.id}><Card data={data} /></SwiperSlide>
									})
								}
							</Swiper>
						</div>
						<div>

						</div>
					</div>
				</section>
			</Layout>
		</>
	)
}

export default Home
