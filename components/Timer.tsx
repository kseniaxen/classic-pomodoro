"use client";

import { useState, useEffect } from "react";
import { configTimer, type TimerConfig } from "../config/configTimer";

const formatTimer = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function CountdownTimer() {
  const [time, setTime] = useState<number>(configTimer[0].seconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedTimer, setSelectedTimer] = useState<TimerConfig>(configTimer[0]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTime((prev) => {
      if (prev <= 1) {
        setIsRunning(false);
        return 0;
      }

      return prev - 1;
    });
    }, 1000)

    return () => clearInterval(timer);
  }, [isRunning])

  const handleReset = () => {
    setTime(selectedTimer.seconds);
    setIsRunning(false);
  }

  return (
    <>
      <h1>{formatTimer(time)}</h1>
      {configTimer.map((timer) => (
        <button key={timer.id} onClick={() => {
          setSelectedTimer(timer);
          setTime(timer.seconds)
        }}>
          {timer.label}
        </button>
      ))}

      <p>Select Timer: {selectedTimer.label}</p>

      <br />

      <button onClick={() => setIsRunning(true)}>
        Start
      </button>

      <button onClick={() => setIsRunning(false)}>
        Pause
      </button>

      <button onClick={handleReset}>
        Reset
      </button>
    </>
  );
}