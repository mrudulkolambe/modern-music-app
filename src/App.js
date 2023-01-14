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
import { useState } from 'react';
import Queue from './components/Queue';
import Fullscreen from './pages/Fullscreen';

function App() {
  const [showQueue, setShowQueue] = useState(false);
  const [fullscreen, setShowFullScreen] = useState(false)
  return (
    <AuthContextProvider>
      <HomeContextProvider>
        <PlayerContextProvider>
          <SearchContextProvider>
            {showQueue && <Queue setShowQueue={setShowQueue} />}
            {<Fullscreen setShowFullScreen={setShowFullScreen} fullscreen={fullscreen}/>}
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/album/:id' element={<Album />} />
              <Route path='/playlist/:id' element={<Playlist isUserPlaylist={false} />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/u/playlist/:id' element={<Playlist isUserPlaylist={true} isLikedSongs={false} />} />
              <Route path='/liked-songs' element={<Playlist isLikedSongs={true} isUserPlaylist={false} />} />
              <Route path='/search/songs' element={<SongSearch />} />
              <Route path='/search/albums' element={<AlbumSearch />} />
              <Route path='/search/playlists' element={<PlaylistSearch />} />
              <Route path='/play' element={<Fullscreen />} />
            </Routes>
          </SearchContextProvider>
          <Player showQueue={showQueue} setShowFullScreen={setShowFullScreen} setShowQueue={setShowQueue} />
        </PlayerContextProvider>
      </HomeContextProvider>
    </AuthContextProvider>
  );
}

export default App;
