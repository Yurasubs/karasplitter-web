import type { RadioOption } from "@/lib/types";
import { radioLabelClass } from "@/lib/constants";

interface RadioGroupProps<T extends string> {
    name: string;
    options: RadioOption<T>[];
    value: T;
    onChange: (value: T) => void;
    disabled?: boolean;
    className?: string;
}

export function RadioGroup<T extends string>({
    name,
    options,
    value,
    onChange,
    disabled = false,
    className = "",
}: RadioGroupProps<T>) {
    return (
        <div
            className={`flex flex-wrap gap-4 transition-opacity ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`}
        >
            {options.map((option) => (
                <label key={option.value} className={radioLabelClass}>
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        checked={value === option.value}
                        onChange={() => onChange(option.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-input"
                    />
                    <span className="capitalize">{option.label}</span>
                </label>
            ))}
        </div>
    );
}
