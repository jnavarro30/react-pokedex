import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokedexScreen from './PokedexScreen';
import MusicScreen from './MusicScreen';
import tracks from '../assets/audio/tracks'

function Pokedex() {
    const [pokemonParam, setPokemonParam] = useState(1)
    const [classicMode, setClassicMode] = useState(false)
    const [pokemonInfo, setPokemonInfo] = useState({})
    const [darkMode, setDarkMode] = useState(false)
    const [pokedexScreen, setPokedexScreen] = useState(true)
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
    const [userInput, setUserInput] = useState('')
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTrack, setCurrentTrack] = useState('')

    // pokemon api
    useEffect(() => {
        if (pokedexScreen) {
            const getPokemon = async () => {
                try {
                    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonParam}`
                    const body = await axios.get(url)
                    const pokemon = body.data
                    const { id, name } = pokemon
                    const sprite = classicMode ? pokemon.sprites.front_default
                        : pokemon.sprites.other.dream_world.front_default

                    setPokemonInfo({
                        id, name, sprite
                    })
                } catch (err) {
                    return
                }
            }
            getPokemon()
        }

    }, [pokemonParam, classicMode, pokedexScreen])

    // buttons
    const redBtn = () => {
        setPokemonParam(1)
        setClassicMode(false)
        setDarkMode(false)
        setCurrentTrackIndex(0)
        setPokedexScreen(true)
        setUserInput('')
        setCurrentTrackIndex(0)
        if (currentTrack) currentTrack.pause()
        setCurrentTrack('')
        setIsPlaying(false)
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
            if (arrow === 'up' && currentTrackIndex <= 1) return
            if (arrow === 'bottom' && currentTrackIndex >= 8) return
            if (arrow === 'left' && currentTrackIndex <= 0) return
            if (arrow === 'right' && currentTrackIndex >= 9) return

            if (arrow === 'up' || arrow === 'bottom') {
                setCurrentTrackIndex((prevTrack) => {
                    return arrow === 'up' ? prevTrack - 2 : prevTrack + 2
                })
            } else {
                setCurrentTrackIndex((prevTrack) => {
                    return arrow === 'left' && prevTrack % 2 ? prevTrack - 1 :
                        arrow === 'right' && prevTrack % 2 === 0 ? prevTrack + 1 : prevTrack
                })
            }
        }
    }


    const handleOnChange = e => {
        const input = e.target.value
        setUserInput(input)
    }

    const handleOnKeyPress = e => {
        if (e.which === 13) blueBtn()
    }

    const handleOnKeyDown = e => {
        switch (e.which) {
            case 37:
                arrowBtns('left')
                break
            case 40:
                arrowBtns('bottom')
                break
            case 38:
                arrowBtns('up')
                break
            case 39:
                arrowBtns('right')
                break
            default:
                return
        }
    }

    const blueBtn = () => {
        if (!userInput) return
        setPokemonParam(userInput)
        setUserInput('')
    }

    // music
    const speakerBtn = () => {
        const url = Object.values(tracks[currentTrackIndex])[0]
        if (isPlaying && currentTrack.src === url) {
            currentTrack.pause()
            setIsPlaying(false)
        } else if (!isPlaying && currentTrack.src === url) {
            currentTrack.play()
            setIsPlaying(true)
        } else {
            if (currentTrack) {
                currentTrack.src = url
                currentTrack.play()
                setIsPlaying(true)
            } else {
                const song = new Audio(url)
                setCurrentTrack(song)
                song.play()
                setIsPlaying(true)
            }
        }
    }

    return (
        <div className='pokedex' tabIndex="1" onKeyDown={handleOnKeyDown}>
            {
                pokedexScreen ?
                    <PokedexScreen
                        pokemonParam={pokemonParam}
                        pokemonInfo={pokemonInfo}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                    /> :
                    <MusicScreen
                        currentTrackIndex={currentTrackIndex}
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
            <div className='speaker-btn btn' onClick={speakerBtn}></div>
            <input className='input-btn btn' type='text' name='input' value={userInput} placeholder='Name/ID' onChange={handleOnChange} onKeyPress={handleOnKeyPress} />
        </div>
    )
}

export default Pokedex
