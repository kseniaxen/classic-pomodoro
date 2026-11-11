import type { TimerConfig } from "@/config/configTimer";

interface TimerModesProps {
    configTimer: TimerConfig[];
    currentTimer: TimerConfig;
    handleSelectTimer: (timer: TimerConfig) => void;
}

const formatTimer = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    return `${Math.trunc(minutes).toString()} min`
}

export default function TimerModes({ configTimer, currentTimer, handleSelectTimer }: TimerModesProps) {
    return (
        <div className="flex justify-center gap-4">
            {configTimer.map((timer) => (
                <button
                    key={timer.id}
                    onClick={() => handleSelectTimer(timer)}
                    className={`
                        px-8 py-1
                        rounded-full
                        font-playfair
                        font-normal
                        transition-all duration-300
                        ${currentTimer.id === timer.id ?
                            "bg-amber-200/60 text-white shadow-lg"
                            : "bg-black/40 text-white/80 hover:bg-white/15"
                        }
                    `}
                >
                    <div className="flex flex-col items-center gap-1">
                        <p>{timer.label}</p>
                        <p>{formatTimer(timer.seconds)}</p>
                    </div>
                </button>
            ))}
        </div>
    )
}
