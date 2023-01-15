import { Route, Routes, useLocation } from 'react-router-dom';
import Player from './components/Player';
import { AuthContextProvider } from './context/Auth';
import { HomeContextProvider } from './context/Home';
import { PlayerContextProvider } from './context/PlayerContext';
import { SearchContextProvider } from './context/SearchContext';
import Album from './pages/Album';
import Home from './pages/Home';
import Login from './pages/Login';
import Playlist from './pages/Playlist';
import SongSearch from './pages/SongSearch';
import Settings from './pages/Settings';
import AlbumSearch from './pages/AlbumSearch';
import PlaylistSearch from './pages/PlaylistSearch';
import { useEffect, useState } from 'react';
import Queue from './components/Queue';
import Fullscreen from './pages/Fullscreen';
import ClonePlaylist from './pages/ClonePlaylist';
import UnAuthorized from './pages/UnAuthorized';
import Loading from './components/Loading';

function App() {
  const [showQueue, setShowQueue] = useState(false);
  const [fullscreen, setShowFullScreen] = useState(false);
  const [loading, setLoading] = useState(true)
  return (
    <AuthContextProvider setLoading={setLoading}>
      <HomeContextProvider setLoading={setLoading}>
        <PlayerContextProvider>
          <div className='hidden lg:flex'>
            <SearchContextProvider>
              {showQueue && <Queue setShowQueue={setShowQueue} />}
              {<Fullscreen setShowFullScreen={setShowFullScreen} fullscreen={fullscreen} />}
              {/* {<Loading loading={loading} />} */}
              <Routes>
                <Route path='/' element={<Home loading={loading} setLoading={setLoading} />} />
                <Route path='/login' element={<Login />} />
                <Route path='/album/:id' element={<Album loading={loading} setLoading={setLoading} />} />
                <Route path='/playlist/:id' element={<Playlist isUserPlaylist={false} loading={loading} setLoading={setLoading} />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/u/playlist/:id' element={<Playlist isUserPlaylist={true} isLikedSongs={false} loading={loading} setLoading={setLoading} />} />
                <Route path='/liked-songs' element={<Playlist isLikedSongs={true} isUserPlaylist={false} loading={loading} setLoading={setLoading} />} />
                <Route path='/search/songs' element={<SongSearch />} />
                <Route path='/search/albums' element={<AlbumSearch />} />
                <Route path='/search/playlists' element={<PlaylistSearch />} />
                <Route path='/clone/:id' element={<ClonePlaylist />} />
                <Route path='/unauthorized' element={<UnAuthorized loading={loading} setLoading={setLoading} />} />
              </Routes>
            </SearchContextProvider>
            <Player showQueue={showQueue} setShowFullScreen={setShowFullScreen} setShowQueue={setShowQueue} />
          </div>
          <div className='lg:hidden md:block h-screen w-screen bg z-[5000]'></div>
        </PlayerContextProvider>
      </HomeContextProvider>
    </AuthContextProvider>
  );
}

export default App;
