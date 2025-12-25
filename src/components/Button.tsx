import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "transparent" | "grayTransparent";
    size?: "sm" | "md" | "lg";
}

export const Button = ({
    variant = "primary",
    size = "md",
    className = "",
    type = "button",
    disabled,
    ...props
}: Props) => {
    const base = "inline-flex items-center justify-center rounded-md font-semibold ";

    const variants: Record<string, string> = {
        primary: "bg-red-600 text-white hover:bg-red-700 border border-red-600",
        secondary: "bg-transparent text-red-600 hover:bg-red-50 border-1 border-red-600",
        transparent: "bg-transparent text-red-600 hover:bg-red-50",
        grayTransparent: "bg-transparent text-gray-600 hover:bg-red-50",
    };

    const disabledStyles = "bg-gray-300 text-white";

    const sizes: Record<string, string> = {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-4 text-base",
        lg: "h-12 px-6 text-lg",    
    };

    return (
        <button
            type={type}
            {...props}
            className={`${base} ${sizes[size]} ${disabled ? disabledStyles : variants[variant]} ${className}`}
        />
    );
};
