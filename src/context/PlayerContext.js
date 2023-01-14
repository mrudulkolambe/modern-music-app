import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../hooks/useLocalstorage";

const PlayerContext = createContext();

export function PlayerContextProvider({ children }) {

	const [currentSong, setCurrentSong] = useState();
	const [songData, setSongData] = useState();
	const [queue, setQueue] = useState([]);
	const [quality, setQuality] = useState({ label: "160kbps (Best)", quality: '160.mp4' });
	const [loopPlayer, setLoopPlayer] = useState(false);
	const [playState, setPlayState] = useState(false);
	const [duration, setDuration] = useState({ currentTime: "0:00", duration: "0:00", progress: 0, paused: true });

	const [devices, setDevices] = useState([])

	const setPlayerQuality = (data) => {
		setQuality(data);
		setLocalStorage("quality", data)
	}
	useEffect(() => {
		setCurrentSong(getLocalStorage('currentsong'));
		setQueue(getLocalStorage('queue'));
		if (getLocalStorage('quality')) {
			setQuality(getLocalStorage('quality'))
		} else {
			setLocalStorage('quality', quality)
		}
	}, []);

	const handleSongPlayWithQueue = (list) => {
		if (list.length != 0) {
			setQueue(list);
			setCurrentSong(list[0])
		}
	}

	useEffect(() => {
		if (currentSong) {
			setLocalStorage('currentsong', currentSong)
			setLocalStorage('queue', queue)
			axios(`https://musify-backend.vercel.app/authtoken`, {
				method: "POST",
				data: { id: currentSong?.more_info?.encrypted_media_url, quality }
			})
				.then((res) => {
					let url = res.data.auth_url.split("?");
					url[0] = url[0].replace("ac.cf.saavncdn.com", "aac.saavncdn.com")
					url[0] = url[0].replace("160.mp4", "320.mp4");
					setSongData(res.data);
				})
		}
	}, [currentSong]);

	const handleCurrentTime = (e) => {
		setDuration({ currentTime: formatDuration(e.target.currentTime), duration: formatDuration(e.target.duration), progress: ((e.target.currentTime / e.target.duration) * 100).toFixed(2), paused: e.target.paused === "false" ? false : true })
		document.documentElement.style.setProperty('--progress-bar-width', `${((e.target.currentTime / e.target.duration) * 100).toFixed(2)}%`)
	}

	const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
		minimumIntegerDigits: 2,
	})

	const handleSongEnd = () => {
		if (queue) {
			if (queue.length - 1 > currentSong?.index) {
				// setAutoPlay(true)
				setCurrentSong(queue[currentSong?.index + 1])
			}
		}
	}


	function formatDuration(duration) {
		const time = Number(duration)
		const seconds = Math.floor(time % 60)
		const minutes = Math.floor(time / 60) % 60
		const hours = Math.floor(time / 3600)
		if (hours === 0) {
			if (`${minutes}:${leadingZeroFormatter.format(seconds)}`.includes("NaN")) {
				return `00:00`
			}
			else {
				return `${minutes}:${leadingZeroFormatter.format(seconds)}`
			}
		} else {
			if (`${hours}:${leadingZeroFormatter.format(
				minutes
			)}:${leadingZeroFormatter.format(seconds)}`.includes("NaN")) {
				return "00:00"
			}
			else {
				return `${hours}:${leadingZeroFormatter.format(
					minutes
				)}:${leadingZeroFormatter.format(seconds)}`
			}
		}
	}

	const handleNext = () => {
		if (queue?.length - 1 > currentSong?.index) {
			setCurrentSong(queue[currentSong?.index + 1])
		}
	}
	const handlePrevious = () => {
		if (currentSong?.index > 0) {
			setCurrentSong(queue[currentSong?.index - 1])
		}
	}
	return (
		<PlayerContext.Provider value={{ handleNext, handlePrevious, handleSongEnd, playState, setPlayState, duration, setDuration, handleCurrentTime, devices, setDevices, loopPlayer, setLoopPlayer, quality, setPlayerQuality, currentSong, setCurrentSong, songData, formatDuration, queue, setQueue, handleSongPlayWithQueue }}>
			{children}
		</PlayerContext.Provider>
	);
}

export function usePlayerContext() {
	return useContext(PlayerContext);
}
