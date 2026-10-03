interface TimerDisplayProps {
    time: number;
}

const formatTimer = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function TimerDisplay({ time }: TimerDisplayProps) {
    return <h1>{formatTimer(time)}</h1>;
}