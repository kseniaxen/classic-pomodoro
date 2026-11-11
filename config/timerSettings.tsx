export interface TimerSettings {
    focus: number;
    shortBreak: number;
    longBreak: number;
}

export const defaultTimerSettings: TimerSettings = {
    focus: 1,
    shortBreak: 5,
    longBreak: 15,
};