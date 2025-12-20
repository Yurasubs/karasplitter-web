import { FileText } from "lucide-react";

interface TextInputProps {
	value: string;
	onChange: (value: string) => void;
}

export function TextInput({ value, onChange }: TextInputProps) {
	return (
		<div className="w-full space-y-2">
			<label
				htmlFor="ass-input"
				className="block text-sm font-medium"
				style={{ color: "var(--foreground)" }}
			>
				Paste .ass file content here
			</label>
			<div className="relative">
				<textarea
					id="ass-input"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder="Dialogue: 0,0:00:00.00,0:00:05.00,Default,,0,0,0,,kinou yori mo"
					className="w-full h-64 p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm resize-y"
					style={{
						background: "var(--input-bg)",
						borderColor: "var(--input-border)",
						color: "var(--foreground)",
						border: "1px solid var(--input-border)",
					}}
				/>
				<div
					className="absolute top-3 right-3 pointer-events-none"
					style={{ color: "var(--muted)" }}
				>
					<FileText className="w-5 h-5" />
				</div>
			</div>
			<p className="text-xs" style={{ color: "var(--muted)" }}>
				Copy the entire content of your .ass file and paste it above.
			</p>
		</div>
	);
}
