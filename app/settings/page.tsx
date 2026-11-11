"use client";

import { useState, useEffect } from "react";
import { defaultTimerSettings, TimerSettings } from "@/config/timerSettings";
import NumberInput from "@/components/NumberInput";

export default function SettingsPage() {
    const [settings, setSettings] = useState<TimerSettings>(defaultTimerSettings);

    useEffect(() => {
        const savedSettings = localStorage.getItem("pomodoro-settings");

        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, []);

    const handleChange = (name: keyof TimerSettings, value: number) => {
        setSettings((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        localStorage.setItem(
            "pomodoro-settings",
            JSON.stringify(settings)
        );
    };

    return (
        <div className="flex justify-center px-6 py-16">
            <div className="w-full max-w-xl">
                <h1 className="font-playfair text-4xl mb-2 text-center">
                    Settings
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <NumberInput
                        label="Focus Duration"
                        value={settings.focus}
                        min={1}
                        max={90}
                        onChange={(value) => handleChange("focus", value)}
                    />

                    <NumberInput
                        label="Short Break"
                        value={settings.shortBreak}
                        min={1}
                        max={30}
                        onChange={(value) => handleChange("shortBreak", value)}
                    />

                    <NumberInput
                        label="Long Break"
                        value={settings.longBreak}
                        min={1}
                        max={60}
                        onChange={(value) => handleChange("longBreak", value)}
                    />
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-amber-200/60 py-3 font-playfair text-lg hover:bg-amber-200/80 transition-colors duration-300 cursor-pointer"
                    >
                        Save Settings
                    </button>
                </form>
            </div>
        </div>
    );
}