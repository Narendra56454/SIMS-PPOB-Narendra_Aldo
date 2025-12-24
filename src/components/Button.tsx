import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "transparent";
    size?: "sm" | "md" | "lg";
}

export const Button = ({
    variant = "primary",
    size = "md",
    className = "",
    type = "button",
    ...props
}: Props) => {
    const base = "inline-flex items-center justify-center rounded-md font-semibold transition focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants: Record<string, string> = {
        primary: "bg-red-600 text-white hover:bg-red-700 border border-red-600",
        secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200",
        transparent: "bg-transparent text-red-600 hover:bg-red-50 border-none",
    };

    const sizes: Record<string, string> = {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-4 text-base",
        lg: "h-12 px-6 text-lg",
    };

    return (
        <button
            type={type}
            {...props}
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        />
    );
};
