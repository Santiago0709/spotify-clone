import { usePlayerStore } from "@/store/playerStore"
import { useState, useRef, useEffect } from "react"
import Slider from "./Slider"

export const Play = () => (
    <svg
        fill="black"
        viewBox="0 0 16 16"
        height="18px"
        width="18px"
    >
        <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z" />
    </svg>

)

export const Pause = () => (
    <svg
        viewBox="0 0 530 1000"
        fill="black"
        height="18px"
        width="18px"
    >
        <path d="M440 150c60 0 90 21.333 90 64v570c0 44-30 66-90 66s-90-22-90-66V214c0-42.667 30-64 90-64m-350 0c60 0 90 21.333 90 64v570c0 44-30 66-90 66S0 828 0 784V214c0-42.667 30-64 90-64" />
    </svg>
)

const CurrentSong = ({ image, title, artists}) => {
    return (
        <div className={`
            flex items-center gap-5 relative 
            overflow-hidden   
        `}>
            <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
                <img src={image} alt={title} />
            </picture>

            <div className="flex flex-col">
                <h3 className="font-semibold text-sm block">{title}</h3>
                <span className="text-xs opacity-80 ">{artists?.join(', ')}</span>
            </div>
        </div>
    )
}
export function Player() {
    const { currentMusic, isPlaying, setIsPlaying } = usePlayerStore(state => state)
    const audioRef = useRef()

    useEffect(() => {
        isPlaying
            ? audioRef.current.play()
            : audioRef.current.pause()
    }, [isPlaying])

    useEffect(() => {
        const { song, playlist, songs } = currentMusic
        if (song) {
            const src = `/music/${playlist.id}/0${song.id}.mp3`
            audioRef.current.src = src
            audioRef.current.play()
        }
    }, [currentMusic])

    const handleClick = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <div className="flex flex-row justify-between w-full px-4 z-50">
            <div>
                <CurrentSong {...currentMusic.song} />
            </div>

            <div className="grid place-content-center gap-4 flex-1">
                <div className="flex justify-center">
                    <button className="bg-white rounded-full p-2 items-center justify-center" onClick={handleClick}>
                        {isPlaying ? <Pause /> : <Play />}
                    </button>
                </div>
            </div>

            <div className="grid place-content-center">
                <Slider
                    defaultValue={100}
                    min={0}
                    max={100}
                    className="w-[95px]"
                    onValueChange={(value) => {
                        const [newVolume] = value
                        audioRef.current.volume = newVolume / 100
                    }}
                />
            </div>

            <audio ref={audioRef} />
        </div>
    )
}