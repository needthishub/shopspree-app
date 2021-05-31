export type ButtonType = "primary" | "default";

export interface ButtonProps {
    className?: string;
    selected?: boolean;
    type?: ButtonType;
    style?: React.CSSProperties;
    disabled?: boolean;

    onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}
