import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../configurations/firebase";
import { useAuthContext } from "../context/Auth";

function useAddLikedSongs(song) {
	const { user } = useAuthContext();
	if (user) {
		const likedSongsRef = doc(db, "Liked-songs", user?.uid);
		updateDoc(likedSongsRef, {
			list: arrayUnion(song)
		})
	}
}

export { useAddLikedSongs };