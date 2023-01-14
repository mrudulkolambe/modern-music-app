import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";



const HomeContext = createContext();

export function HomeContextProvider({ children }) {

	const [homeData, setHomeData] = useState()

	useEffect(() => {
		axios('http://localhost:5500/home', {
			method: "GET"
		})
			.then((res) => {
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
