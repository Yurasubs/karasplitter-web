interface ToggleProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export function Toggle({ label, checked, onChange }: ToggleProps) {
    return (
        <div
            className={`p-2 rounded-lg transition-colors ${checked ? "bg-blue-500/10" : "bg-hover"}`}
        >
            <label className="flex items-center justify-between cursor-pointer group">
                <div>
                    <span
                        className={`font-small block ${checked ? "text-blue-500" : "text-foreground"}`}
                    >
                        {label}
                    </span>
                </div>
                <div className="relative">
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => onChange(e.target.checked)}
                        className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                </div>
            </label>
        </div>
    );
}
