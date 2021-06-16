import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {PopoverChildrenPosition, PopoverProps} from "./interface";
import './style.css';
import {useLayoutEffectOnUpdate} from "../../customHooks/useLayoutEffectOnUpdate";

const Popover: React.FC<PopoverProps> = ({children, controlShow, onClick, position, popoverBodyClassName, content}) => {
    const root = useRef(document.querySelector('#root') as HTMLDivElement);
    const el = useRef(document.createElement('div') as HTMLDivElement);
    const childrenRef = useRef<HTMLDivElement>(null);
    const popperRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);
    const [contentWidth, setContentWidth] = useState(0);
    const [childrenPosition, setChildrenPosition] = useState<PopoverChildrenPosition>({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    });

    useEffect(() => {
        root.current.appendChild(el.current);
        setTimeout(() => {
            const childrenElement = childrenRef.current;

            if (childrenElement) {
                const {top, right, bottom, left} = childrenElement.getBoundingClientRect();

                setChildrenPosition({
                    top,
                    right,
                    bottom,
                    left
                });
            }
        }, 500);
        return function cleanup() {
            root.current.removeChild(el.current);
        };
    }, []);

    useLayoutEffectOnUpdate(() => {
        const popperWidth = popperRef.current ?
            popperRef.current?.getBoundingClientRect().width : 0;

        if ((!contentWidth || popperWidth !== contentWidth) && getShowValue()) {
            setContentWidth(popperWidth);
        }
    });

    const renderChildElement = () => {
        return React.cloneElement(children as React.ReactElement, {
            ref: childrenRef,
            onClick: handleContentClick
        });
    }

    const getShowValue = () => {
        return controlShow === undefined ? show : controlShow;
    }

    const handleContentClick = () => {
        controlShow === undefined && setShow(!show);

        onClick && onClick();
    }

    const renderPopover = () => {
        let style: React.CSSProperties;

        switch (position) {
            case "bottomleft":
                style = {
                    top: childrenPosition.bottom,
                    left: childrenPosition.right - contentWidth,
                }
                break;
            case "bottomright":
                style = {
                    top: childrenPosition.bottom,
                    left: childrenPosition.left
                }
                break;
        }

        return getShowValue() ? ReactDOM.createPortal(
            <div className="popover-content-container" ref={popperRef} style={style}>
                <div className={`popover-body ${popoverBodyClassName || ''}`}>
                    {content}
                </div>
            </div>,
            el.current
        ) : null;
    }

    return (
        <>
            {renderChildElement()}
            {renderPopover()}
        </>
    );
}

export default Popover;
