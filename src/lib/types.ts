export type Theme = "light" | "dark";

export type SelectorType = "all" | "actor" | "style";

export interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
    children: React.ReactNode;
}

export interface RadioOption<T extends string> {
    value: T;
    label: string;
}
