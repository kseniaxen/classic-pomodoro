import type { TimerSettings } from "./timerSettings";

export type TimerMode = "focus" | "shortBreak" | "longBreak";

export interface TimerConfig {
    id: string;
    label: string;
    seconds: number;
    mode: TimerMode;
}

export const getTimerConfig = (settings: TimerSettings): TimerConfig[] => [
    {
        id: "focus",
        label: "Focus",
        seconds: settings.focus * 60,
        mode: "focus",
    },
    {
        id: "short-break",
        label: "Short Break",
        seconds: settings.shortBreak * 60,
        mode: "shortBreak",
    },
    {
        id: "long-break",
        label: "Long Break",
        seconds: settings.longBreak * 60,
        mode: "longBreak",
    },
];
