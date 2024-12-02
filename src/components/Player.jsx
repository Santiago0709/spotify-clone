import { useState, useRef, useEffect } from "react"

const Play = () => (
    <svg
        fill="black"
        viewBox="0 0 16 16"
        height="18px"
        width="18px"
    >
        <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z" />
    </svg>

)

const Pause = () => (
    <svg
        viewBox="0 0 530 1000"
        fill="black"
        height="18px"
        width="18px"
    >
        <path d="M440 150c60 0 90 21.333 90 64v570c0 44-30 66-90 66s-90-22-90-66V214c0-42.667 30-64 90-64m-350 0c60 0 90 21.333 90 64v570c0 44-30 66-90 66S0 828 0 784V214c0-42.667 30-64 90-64" />
    </svg>

)

export function Player() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentSong, setCurrentSong] = useState(null)
    const audioRef = useRef()

    useEffect(() => {
        audioRef.current.src = '/music/1/01.mp3'
    }, [])

    const handleClick= () => {
        if(isPlaying){
            audioRef.current.pause()
        }else{
            audioRef.current.play()
            audioRef.current.volume = 0.1
        }

        setIsPlaying(!isPlaying)
    }

    return (
        <div className="flex flex-row justify-between w-full px-4 z-50">
            <div>
                CurrentSong...
            </div>

            <div className="grid place-content-center gap-4 flex-1">
                <div className="flex justify-center">
                    <button className="bg-white rounded-full p-2 items-center justify-center" onClick={handleClick}>
                        {isPlaying ? <Pause /> : <Play />}
                    </button>
                </div>
            </div>

            <div className="grid place-content-center">
                Volume
            </div>

            <audio ref={audioRef}/>
        </div>
    )
}