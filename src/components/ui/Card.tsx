import type { CardProps } from "@/lib/types";
import { cardClass } from "@/lib/constants";

export function Card({ children, className = "" }: CardProps) {
    return <div className={`${cardClass} ${className}`}>{children}</div>;
}
