"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Image, Settings } from "lucide-react";

const navItems = [
    {
        label: "Focus",
        href: "/",
        icon: Home,
    },
    {
        label: "Gallery",
        href: "/gallery",
        icon: Image,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: Settings,
    },
];

export default function Navbar() {

    const pathname = usePathname();

    return (
        <header 
            className="
            relative
            w-full
            bg-black/40
            backdrop-blur-[1px]
            border-b border-white/20
        ">
            <nav className="flex justify-center items-center gap-10 py-5">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                relative
                                flex items-center gap-3
                                font-playfair text-base
                                transition-colors duration-300
                                ${
                                    isActive
                                        ? "text-amber-200"
                                        : "text-white/70 hover:text-white"
                                }
                            `}
                        >
                            <Icon size={18} />

                            <span>{item.label}</span>

                            {isActive && (
                                <span className="
                                    absolute
                                    -bottom-3
                                    left-0
                                    w-full
                                    h-0.5
                                    bg-amber-200
                                " />
                            )}
                        </Link>
                    );
                })}
            </nav>
        </header>
    );
}