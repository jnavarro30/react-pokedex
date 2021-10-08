import React from 'react';

function PokedexScreen({ pokemonInfo, darkMode, setDarkMode }) {

    return (
        <div className={`pokedex-screen ${darkMode ? 'dark-mode' : ''}`} onClick={() => setDarkMode(!darkMode)}>
            <img src={pokemonInfo.sprite} alt='pokemon' />
        </div>
    )
}

export default PokedexScreen
