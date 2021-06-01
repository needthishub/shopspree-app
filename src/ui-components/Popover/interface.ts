export interface PopoverProps {
    content: React.ReactNode;
    position: 'bottomleft' | 'bottomright';
    popoverBodyClassName?: string;
    controlShow?: boolean;

    onClick?(): void;
}

export interface PopoverChildrenPosition {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface PopoverState {
    show: boolean;
    childrenPosition: PopoverChildrenPosition;
    contentWidth: number;
}
