export type TimerMode = "focus" | "shortBreak" | "longBreak";

export interface TimerConfig {
    id: string;
    label: string;
    seconds: number;
    mode: TimerMode;
}

export const configTimer: TimerConfig[] = [
    { id: "focus", label: "Focus", seconds: 1 * 60, mode: "focus" },
    { id: "short-break", label: "Short Break", seconds: 5 * 60, mode: "shortBreak" },
    { id: "long-break", label: "Long Break", seconds: 15 * 60, mode: "longBreak" },
];