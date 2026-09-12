export interface TimerConfig {
    id: string;
    label: string;
    seconds: number;
}

export const configTimer: TimerConfig[] = [
    { id: "5min", label: "5 min", seconds: 5 * 60 },
    { id: "10min", label: "10 min", seconds: 10 * 60 },
    { id: "30min", label: "30 min", seconds: 30 * 60 },
    { id: "1hour", label: "1 hour", seconds: 60 * 60 }
];