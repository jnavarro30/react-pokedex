import React from 'react';
import tracks from '../assets/audio/tracks';

function MusicScreen({ currentTrack, darkMode, setDarkMode }) {
    const formatTracks = tracks.map((track, index) => {
        const info = Object.entries(track)
  
        return (
            <div className={`track ${index} ${currentTrack === index ? 'selected' : ''}`} key={index}>{info[0][0]}</div>
        )
    })

    return (
        <div className={`music-screen ${darkMode ? 'dark-mode' : ''}`} onClick={() => setDarkMode(!darkMode)}>
            {formatTracks}
        </div>
    )
}

export default MusicScreen
