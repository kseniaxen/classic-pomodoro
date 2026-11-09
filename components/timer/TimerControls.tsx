interface TimerControlsProps {
    handleStart: () => void;
    handlePause: () => void;
    handleRestart: () => void;
    isRunning: boolean;
}

export default function TimerControls({ handleStart, handlePause, handleRestart, isRunning }: TimerControlsProps) {
    return (
        <div className="flex justify-center items-center gap-4 py-5">
            <button
                onClick={handleStart}
                className={`
                    px-8 py-3 rounded-full
                    font-playfair text-lg
                    transition-colors duration-300
                    ${isRunning
                        ? "bg-amber-200/70 hover:bg-amber-200/80"
                        : "bg-black/10 text-white/90 hover:bg-white/15 hover:text-white"
                    }
                    `}
            >
                Start
            </button>
            <button 
                onClick={handlePause}
                className={`
                    px-8 py-3 rounded-full
                    font-playfair text-lg
                    transition-colors duration-300
                    ${!isRunning
                        ? "bg-amber-200/70 hover:bg-amber-200/80"
                        : "bg-black/10 text-white/90 hover:bg-white/15 hover:text-white"
                    }
                    `}>
                        Pause
            </button>
            <button 
                onClick={handleRestart}
                className={`
                    px-8 py-3 rounded-full
                    font-playfair text-lg
                    bg-black/10 text-white/70
                    hover:bg-white/15 hover:text-white
                    transition-colors duration-300
                `}>
                    Restart
            </button>
        </div>
    )
}