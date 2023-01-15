import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";



const HomeContext = createContext();

export function HomeContextProvider({ children, setLoading }) {

	const [homeData, setHomeData] = useState()

	useEffect(() => {
		axios('https://musify-backend.vercel.app/home', {
			method: "GET"
		})
			.then((res) => {
				setLoading(false)
				setHomeData(res.data)
			})
	}, []);

	return (
		<HomeContext.Provider value={{ homeData }}>
			{children}
		</HomeContext.Provider>
	);
}

export function useHomeContext() {
	return useContext(HomeContext);
}
