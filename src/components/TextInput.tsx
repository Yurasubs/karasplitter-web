"use client";

import { FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TextInputProps {
	value: string;
	onChange: (value: string) => void;
}

export function TextInput({ value, onChange }: TextInputProps) {
	return (
		<div className="w-full space-y-2">
			<Label htmlFor="ass-input">Paste .ass file content here</Label>
			<div className="relative">
				<Textarea
					id="ass-input"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					placeholder="Dialogue: 0,0:00:00.00,0:00:05.00,Default,,0,0,0,,kinou yori mo"
					className="h-64 font-mono text-sm resize-y"
				/>
				<div className="absolute top-3 right-3 pointer-events-none text-[hsl(var(--muted-foreground))]">
					<FileText className="w-5 h-5" />
				</div>
			</div>
			<p className="text-xs text-[hsl(var(--muted-foreground))]">
				Copy the entire content of your .ass file and paste it above.
			</p>
		</div>
	);
}
