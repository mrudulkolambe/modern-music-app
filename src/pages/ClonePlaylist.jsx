import React from 'react'
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { useAuthContext } from '../context/Auth'
import { db } from '../configurations/firebase';
import { useNavigate, useParams } from 'react-router-dom';

const ClonePlaylist = () => {
	const { user } = useAuthContext();
	const { id } = useParams();
	const navigate = useNavigate()

	const handleClone = async () => {
		if (user) {
			const docRef = doc(db, "PLAYLIST", id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const docRef1 = await addDoc(collection(db, "PLAYLIST"), { ...docSnap.data(), uid: user?.uid })
					.then((document) => {
						navigate(`/u/playlist/${document.id}`)
					})
			} else {
				console.log("No such document!");
			}
		}
	}
	return (
		<>
			<div className='h-screen w-screen text-center flex items-center justify-center'>
				<div>
					<h1 className='font-semibold text-4xl text-white mb-2'>Are You Sure you want to clone the playlist?</h1>
					<button onClick={handleClone} className='text-white px-4 py-2 bg-white bg-opacity-10 rounded-lg font-semibold text-lg hover:bg-opacity-20 duration-300'>Clone</button>
				</div>
			</div>
		</>
	)
}

export default ClonePlaylist