"use client";

import { ChevronUp, ChevronDown } from "lucide-react";

interface NumberInputProps {
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (value: number) => void;
}

export default function NumberInput({
    label,
    value,
    min,
    max,
    onChange,
}: NumberInputProps) {
    const handleIncrement = () => {
        if (value < max) {
            onChange(value + 1);
        }
    };

    const handleDecrement = () => {
        if (value > min) {
            onChange(value - 1);
        }
    };

    return (
        <div>
            <label className="block font-playfair text-xl mb-2">
                {label}
            </label>

            <div className="flex items-center gap-2">

                <input
                    type="number"
                    min={min}
                    max={max}
                    step="1"
                    required
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="flex-1 rounded-xl bg-black/20 border border-white/20 px-4 py-3 text-white outline-none focus:border-amber-200"
                />

                <div className="flex flex-col gap-1">

                    <button
                        type="button"
                        onClick={handleIncrement}
                        disabled={value >= max}
                        className="p-2 rounded-lg bg-amber-200/20 text-amber-200 hover:bg-amber-200/40 disabled:opacity-30 transition-colors"
                    >
                        <ChevronUp size={18} />
                    </button>

                    <button
                        type="button"
                        onClick={handleDecrement}
                        disabled={value <= min}
                        className="p-2 rounded-lg bg-amber-200/20 text-amber-200 hover:bg-amber-200/40 disabled:opacity-30 transition-colors"
                    >
                        <ChevronDown size={18} />
                    </button>

                </div>

            </div>
        </div>
    );
}