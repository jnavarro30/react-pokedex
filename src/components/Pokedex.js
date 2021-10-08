import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokedexScreen from './PokedexScreen';
import MusicScreen from './MusicScreen';

function Pokedex() {
    const [pokemonParam, setPokemonParam] = useState(1)
    const [classicMode, setClassicMode] = useState(false)
    const [pokemonInfo, setPokemonInfo] = useState({})
    const [darkMode, setDarkMode] = useState(false)
    const [pokedexScreen, setPokedexScreen] = useState(true)
    const [currentTrack, setCurrentTrack] = useState(0)
    const [userInput, setUserInput] = useState('')

    // pokemon api
    useEffect(() => {
        const getPokemon = async() => {
            try {
                const url = `https://pokeapi.co/api/v2/pokemon/${pokemonParam}`
                const body = await axios.get(url)
                const pokemon = body.data
                const { id, name, height: ht, weight: wt } = pokemon
                const type = pokemon.types[0].type.name
                const sprite = classicMode ? pokemon.sprites.front_default 
                    : pokemon.sprites.other.dream_world.front_default
            
                setPokemonInfo({
                    id, name, type, ht, wt, sprite
                })
            } catch(err) {
                console.log(err)
                return
            }
        }
        getPokemon()
    }, [pokemonParam, classicMode, pokedexScreen])

    // buttons
    const redBtn = () => {
        setPokemonParam(1)
        setClassicMode(false)
        setDarkMode(false)
        setCurrentTrack(0)
        setPokedexScreen(true)
        setUserInput('')
    }

    const arrowBtns = arrow => {
        const { id } = pokemonInfo
        if (pokedexScreen) {
            if (arrow === 'bottom' && id === 1) return
            if (arrow === 'left' && id === 1) return

            setPokemonParam(() => {
                return arrow === 'up' || arrow === 'right' ? id + 1
                    : id - 1 
            }) 
        } else {
            if (arrow === 'up' && currentTrack <= 1) return
            if (arrow === 'bottom' && currentTrack >= 8) return
            if (arrow === 'left' && currentTrack <= 0) return
            if (arrow === 'right' && currentTrack >= 9) return

            if (arrow === 'up' || arrow === 'bottom') {
                setCurrentTrack((prevTrack) => {
                    return arrow === 'up' ? prevTrack - 2 : prevTrack + 2   
                }) 
            } else {
                setCurrentTrack((prevTrack) => {
                    return arrow === 'left' && prevTrack % 2? prevTrack - 1 : 
                        arrow === 'right' && prevTrack % 2 === 0 ? prevTrack + 1 : prevTrack
                }) 
            } 
        } 
    }

    const handleOnChange = e => {
        const input = e.target.value
        setUserInput(input)
    }

    const blueBtn = () => {
        if (!userInput) return
        setPokemonParam(userInput)
        setUserInput('')
    }

    return (
        <div className='pokedex'>
            {
                pokedexScreen ? 
                <PokedexScreen 
                    pokemonParam={pokemonParam}
                    pokemonInfo={pokemonInfo}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                /> :
                <MusicScreen 
                    currentTrack={currentTrack}
                    setDarkMode={setDarkMode}
                    darkMode={darkMode}
                />
            }
            <div className='up-btn btn' onClick={() => arrowBtns('up')}></div>
            <div className='right-btn btn' onClick={() => arrowBtns('right')}></div>
            <div className='bottom-btn btn' onClick={() => arrowBtns('bottom')}></div>
            <div className='left-btn btn' onClick={() => arrowBtns('left')}></div>
            <div className='red-btn btn' onClick={() => redBtn()}></div>
            <div className='blue-btn btn' onClick={blueBtn}></div>
            <div className='green-btn btn' onClick={() => setClassicMode(!classicMode)}></div>
            <div className='orange-btn btn' onClick={() => setPokedexScreen(!pokedexScreen)}></div>
            <div className='speaker-btn btn'></div>
            <input className='input-btn btn' type='text' name='input' value={userInput} placeholder='Name/ID' onChange={handleOnChange}/>
        </div>
    )
}
// name id next input
// play music
export default Pokedex
