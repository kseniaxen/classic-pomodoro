"use client";

import { useState, useEffect, useRef } from "react";
import { configTimer, type TimerConfig } from "../config/configTimer";
import TimerDisplay from "./TimerDisplay";

export default function Timer() {
  const [time, setTime] = useState<number>(configTimer[0].seconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentTimer, setCurrentTimer] = useState<TimerConfig>(configTimer[0]);
  const [completedFocus, setCompletedFocus] = useState<number>(0);
  const isCompleted = useRef<boolean>(false);

  const handleTimerComplete = () => {
    if (currentTimer.mode === "focus") {
      setCompletedFocus((prev) => prev + 1);
    }

    console.log(`Timer completed: ${currentTimer.label}`);

    const nextTimer = getNextTimer();

    setCurrentTimer(nextTimer);
    setTime(nextTimer.seconds);
    setIsRunning(false);
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTime((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (time !== 0 || !isRunning || isCompleted.current) return;

    isCompleted.current = true;
    handleTimerComplete();
  }, [time, isRunning, currentTimer, completedFocus]);

  const getNextTimer = (): TimerConfig => {
    if (currentTimer.mode === "focus") {
      if ((completedFocus + 1) % 4 === 0) {
        return configTimer.find((timer) => timer.mode === "longBreak")!;
      }

      return configTimer.find((timer) => timer.mode === "shortBreak")!;
    }

    return configTimer.find((timer) => timer.mode === "focus")!;
  };

  const handleRestart = () => {
    isCompleted.current = false;
    setTime(currentTimer.seconds);
    setIsRunning(true);
  };

  const handleStart = () => {
    if (time === 0) return;

    isCompleted.current = false;
    setIsRunning(true);
  };

  const handleSelectTimer = (timer: TimerConfig) => {
    setIsRunning(false);
    isCompleted.current = false;
    setCurrentTimer(timer);
    setTime(timer.seconds)
  };

  return (
    <>
      <TimerDisplay time={time} />
      {configTimer.map((timer) => (
        <button key={timer.id} onClick={() => handleSelectTimer(timer)}>
          {timer.label}
        </button>
      ))}

      <p>Select Timer: {currentTimer.label}</p>

      <br />

      <button onClick={handleStart}>
        Start
      </button>

      <button onClick={() => setIsRunning(false)}>
        Pause
      </button>

      <button onClick={handleRestart}>
        Restart
      </button>

      <br />
      <p>Completed Focus: {completedFocus}</p>
    </>
  );
}