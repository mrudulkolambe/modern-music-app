import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import { qualityArray } from '../configurations/quality'
import { useAuthContext } from '../context/Auth'
import { usePlayerContext } from '../context/PlayerContext'
import { useOnClickOutside } from '../hooks/useClickOutside'
import { setLocalStorage } from '../hooks/useLocalstorage'

const Settings = () => {
	const streamingQualityRef = useRef(null)
	const streamingDeviceRef = useRef(null)
	const { quality, setPlayerQuality, devices, setDevices } = usePlayerContext();
	const [qualityFocus, setQualityFocus] = useState(false);
	const [deviceFocus, setDeviceFocus] = useState(false);

	useOnClickOutside(streamingQualityRef, () => { setQualityFocus(false) }, "streamingQualityRef");
	useOnClickOutside(streamingDeviceRef, () => { setDeviceFocus(false) }, "streamingDeviceRef");

	const { user } = useAuthContext();
	useEffect(() => {
		let finalDevices = [];
		navigator.mediaDevices.enumerateDevices()
			.then((devices) => {
				finalDevices = devices.filter((device) => {
					return device.kind === "audiooutput" && device.deviceId !== "communications" && device.deviceId !== "default"
				});
				setDevices(finalDevices)
			});
	}, []);

	const handleSetDevice = (deviceID) => {
		const audioplayer = document.getElementById('audioplayer');
		audioplayer.setSinkId(deviceID);
		setDeviceFocus(false)
	}
	return (
		<>
			<Layout sidebar={true} topbar={false}>
				<section className='px-16 h-[81vh] overflow-auto py-10 '>
					<div>
						<h1 className='text-white text-2xl font-bold'>Settings</h1>
					</div>
					<div className='mt-10 mb-5'>
						<h3 className='text-white text-xl font-semibold'>Account</h3>
						<div className='mt-4 w-fit flex items-center text-white flex-col'>
							<div className='ml-1'>
								<img className='h-16 w-16 rounded-full' src={user?.photoURL} alt="" />
							</div>
						</div>
					</div>
					<hr />
					<div className='w-full'>
						<div className='grid grid-cols-2 gap-x-24  w-10/12 mt-4'>
							<div className='flex flex-col'>
								<label htmlFor="fullname" className='font-semibold text-white cursor-pointer mb-1 text-sm'>Full Name: </label>
								<input value={user?.displayName} type="text" id='fullname' className='outline-none  text-white w-full py-3 px-6 bg-white bg-opacity-10 rounded-md' placeholder='Enter your full name' />
							</div>
							<div className='flex flex-col'>
								<label htmlFor="email" className='font-semibold text-white cursor-pointer mb-1 text-sm'>Email Address: </label>
								<input value={user?.email} type="text" id='email' readOnly className='read-only:cursor-pointer outline-none  text-white w-full py-3 px-6 bg-white bg-opacity-10 rounded-md' placeholder='Enter your email Id' />
							</div>
						</div>
					</div>
					<div className='w-full'>
						<div className='grid grid-cols-2 gap-x-24  w-10/12 mt-4'>
							<div className='flex flex-col relative'>
								<label htmlFor="streamingQualityRef" className='font-semibold text-white cursor-pointer mb-1 text-sm'>Streaming Quality: </label>
								<input id="streamingQualityRef" onFocus={() => { setQualityFocus(true) }} value={quality.label} type="text" readOnly className='read-only:cursor-pointer text-center outline-none  text-white w-full py-3 px-6 bg-white bg-opacity-10 rounded-md' placeholder='Enter your full name' />
								<div ref={streamingQualityRef} className={qualityFocus ? 'z-10 rounded-md absolute top-full left-0 w-full backdrop-blur-lg mt-2 flex flex-col overflow-hidden' : 'hidden'}>
									{
										qualityArray.map((item) => {
											return <span onClick={() => { setPlayerQuality(item); setLocalStorage('quality', item); setQualityFocus(false) }} key={item.quality} className='bg-opacity-10 bg-white h-11 flex items-center justify-center cursor-pointer hover:bg-opacity-20 duration-150 w-full text-white'>{item.label}</span>
										})
									}
								</div>
							</div>
							<div className='flex flex-col'>
								<label htmlFor="email" className='font-semibold text-white cursor-pointer mb-1 text-sm'>Email Address: </label>
								<input type="text" id='email' readOnly className='read-only:cursor-pointer outline-none  text-white w-full py-3 px-6 bg-white bg-opacity-10 rounded-md' placeholder='Enter your email Id' />
							</div>
						</div>
					</div>

					<div className='mt-4 grid grid-cols-2 w-10/12 gap-x-24'>
						<div className='relative flex flex-col'>
							<label htmlFor="streamingDeviceRef" className='font-semibold text-white cursor-pointer mb-1 text-sm'>Streaming Devices: </label>
							<input id="streamingDeviceRef" onFocus={() => { setDeviceFocus(true) }} value={"Select Device"} type="text" readOnly className='read-only:cursor-pointer text-center outline-none  text-white w-full py-3 px-6 bg-white bg-opacity-10 rounded-md' />
							<div ref={streamingDeviceRef} className={deviceFocus ? 'rounded-md absolute top-full left-0 w-full backdrop-blur-sm mt-2 flex flex-col overflow-hidden' : 'hidden'}>
								{
									devices?.map((device) => {
										return <span onClick={() => { handleSetDevice(`${device.deviceId}`) }} key={device.deviceId} className='bg-opacity-10 bg-white h-11 flex items-center justify-center cursor-pointer hover:bg-opacity-20 duration-150 w-full text-white'>{device.label}</span>
									})
								}
							</div>
						</div>
					</div>
				</section>
			</Layout>
		</>
	)
}

export default Settings