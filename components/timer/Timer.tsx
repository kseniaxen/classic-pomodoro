"use client";

import { useState, useEffect, useRef } from "react";
import { getTimerConfig, type TimerConfig } from "../../config/configTimer";
import TimerDisplay from "./TimerDisplay";
import TimerModes from "./TimerModes";
import TimerControls from "./TimerControls";
import { defaultTimerSettings, type TimerSettings } from "@/config/timerSettings";

export default function Timer() {
  const [settings, setSettings] = useState<TimerSettings>(
    defaultTimerSettings
  );
  const timerConfigs = getTimerConfig(settings);

  const [time, setTime] = useState<number>(timerConfigs[0].seconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentTimer, setCurrentTimer] = useState<TimerConfig>(timerConfigs[0]);
  const [completedFocus, setCompletedFocus] = useState<number>(0);
  const isCompleted = useRef<boolean>(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem("pomodoro-settings");

    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    const updatedTimer = timerConfigs.find(
      (timer) => timer.mode === currentTimer.mode
    )!;

    setCurrentTimer(updatedTimer);
    setTime(updatedTimer.seconds);
  }, [settings]);

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
        return timerConfigs.find((timer) => timer.mode === "longBreak")!;
      }

      return timerConfigs.find((timer) => timer.mode === "shortBreak")!;
    }

    return timerConfigs.find((timer) => timer.mode === "focus")!;
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

  const handlePause = () => {
    setIsRunning(false);
  }

  const handleSelectTimer = (timer: TimerConfig) => {
    setIsRunning(false);
    isCompleted.current = false;
    setCurrentTimer(timer);
    setTime(timer.seconds)
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center gap-4">
      <p className="text-center font-playfair text-2xl text-white/90 ">
        {currentTimer.label}
      </p>

      <TimerDisplay time={time} />
      <TimerModes
        configTimer={timerConfigs}
        currentTimer={currentTimer}
        handleSelectTimer={handleSelectTimer}
      />


      <TimerControls
        handleStart={handleStart}
        handlePause={handlePause}
        handleRestart={handleRestart}
        isRunning={isRunning}
      />

    </div>
  );
}