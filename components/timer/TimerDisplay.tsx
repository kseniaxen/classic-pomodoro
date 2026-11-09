interface TimerDisplayProps {
    time: number;
}

const formatTimer = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function TimerDisplay({ time }: TimerDisplayProps) {
    return <div className="flex justify-center py-6">
        <h1 className="font-playfair font-semibold text-8xl tracking-wide drop-shadow-lg">
            {formatTimer(time)}
        </h1>
    </div>
}