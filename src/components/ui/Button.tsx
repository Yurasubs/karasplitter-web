import type { ButtonProps } from "@/lib/types";
import { buttonPrimaryClass, buttonSecondaryClass } from "@/lib/constants";

export function Button({
    variant = "primary",
    children,
    className = "",
    disabled,
    ...props
}: ButtonProps) {
    const baseClass =
        variant === "primary" ? buttonPrimaryClass : buttonSecondaryClass;
    const disabledClass = disabled
        ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
        : "";

    return (
        <button
            type="button"
            disabled={disabled}
            className={`${baseClass} ${disabledClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
