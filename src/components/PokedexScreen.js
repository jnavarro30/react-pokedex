import React from 'react';

function PokedexScreen({ pokemonInfo, darkMode, setDarkMode }) {

    return (
        <div className={`pokedex-screen ${darkMode ? 'dark-mode' : ''}`} onClick={() => setDarkMode(!darkMode)}>
            <img src={pokemonInfo.sprite} alt='pokemon' />
            <div>#{pokemonInfo.id} {pokemonInfo.name}</div>
        </div>
    )
}

export default PokedexScreen
