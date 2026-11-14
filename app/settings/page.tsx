"use client";

import { useState, useEffect, useRef } from "react";
import { defaultTimerSettings, TimerSettings } from "@/config/timerSettings";
import NumberInput from "@/components/NumberInput";

export default function SettingsPage() {
    const [settings, setSettings] = useState<TimerSettings>(defaultTimerSettings);
    const [showResetModal, setShowResetModal] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        const savedSettings = localStorage.getItem("pomodoro-settings");

        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, []);

    useEffect(() => {
        return () => {
            if (toastTimer.current) {
                clearTimeout(toastTimer.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!showResetModal) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setShowResetModal(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [showResetModal]);


    const handleChange = (name: keyof TimerSettings, value: number) => {
        setSettings((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleReset = () => {
        setSettings(defaultTimerSettings);
        localStorage.setItem(
            "pomodoro-settings",
            JSON.stringify(defaultTimerSettings)
        );
        setShowResetModal(false);

        if (toastTimer.current) {
            clearTimeout(toastTimer.current);
        }

        setIsSaved(true);
        setToastMessage("Settings restored to default!");
        toastTimer.current = setTimeout(() => {
            setIsSaved(false);
        }, 2000);
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        localStorage.setItem(
            "pomodoro-settings",
            JSON.stringify(settings)
        );

        if (toastTimer.current) {
            clearTimeout(toastTimer.current);
        }

        setIsSaved(true);

        setToastMessage("Settings saved successfully!");
        toastTimer.current = setTimeout(() => {
            setIsSaved(false);
        }, 2000);
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
                    <button
                        type="button"
                        onClick={() => setShowResetModal(true)}
                        className="
                            w-full rounded-xl
                            border border-white/20
                            bg-black/10
                            py-3
                            font-playfair text-lg
                            text-white/70
                            hover:bg-white/10 hover:text-white
                            transition-colors duration-300
                            cursor-pointer"
                    >
                        Reset to Default
                    </button>
                </form>
            </div>
            {showResetModal && (
                <div
                    onClick={() => setShowResetModal(false)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6">

                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md rounded-2xl border border-white/15 bg-zinc-900/95 p-6 shadow-2xl">

                        <h2 className="font-playfair text-2xl mb-3">
                            Reset settings?
                        </h2>

                        <p className="text-white/60 mb-6">
                            Are you sure you want to restore the default timer settings?
                        </p>

                        <div className="flex gap-3">

                            <button
                                onClick={() => setShowResetModal(false)}
                                className="flex-1 rounded-xl border border-white/20 py-3 text-white/80 hover:bg-white/10 transition-colors"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleReset}
                                className="flex-1 rounded-xl bg-amber-200/60 py-3 hover:bg-amber-200/80 transition-colors"
                            >
                                Reset
                            </button>

                        </div>

                    </div>

                </div>
            )}
            {isSaved && (
                <div className="toast-notification fixed top-6 right-6 z-[100] flex items-center gap-3 rounded-xl border border-white/20 bg-zinc-900/95 px-5 py-4 shadow-2xl backdrop-blur-md">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                        ✓
                    </div>

                    <div>
                        <p className="font-playfair text-white">
                            {toastMessage}
                        </p>
                        <p className="text-sm text-white/50">
                            Your changes have been saved.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}