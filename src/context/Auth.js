import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import { auth, db } from "../configurations/firebase";
import { onAuthStateChanged } from "firebase/auth";



const AuthContext = createContext();

export function AuthContextProvider({ children, setLoading }) {

	const [user, setUser] = useState();
	const [userPlaylists, setUserPlaylists] = useState([]);
	const [likedSongs, setLikedSongs] = useState();
	const [likedSongsID, setLikedSongsID] = useState([])

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				setUser(user)
			} else {
				// router.push("/auth")
			}
		});
	}, []);

	useEffect(() => {
		if (user) {
			const unsub = onSnapshot(doc(db, "Liked-songs", user?.uid), (doc) => {
				setLikedSongs(doc.data());
				let likedSongsIDTemp = doc.data()?.list.map((song) => {
					return song.id
				})
				setLikedSongsID(likedSongsIDTemp || [])
			});

			const q = query(collection(db, "PLAYLIST"), where("uid", "==", user?.uid));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const data = [];
				querySnapshot.forEach((doc) => {
					data.push({ ...doc.data(), id: doc.id });
				});
				setUserPlaylists(data)
			});
		}
	}, [user]);

	return (
		<AuthContext.Provider value={{ setUser, user, userPlaylists, likedSongs, likedSongsID }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	return useContext(AuthContext);
}
