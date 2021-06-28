import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {PopoverChildrenPosition, PopoverProps} from "./interface";
import './style.css';
import {useLayoutEffectOnUpdate} from "../../customHooks/useLayoutEffectOnUpdate";
import {INITIAL_CHILDREN_POSITION} from "./constant";

const Popover: React.FC<PopoverProps> = ({children, controlShow, onClick, position, popoverBodyClassName, content}) => {
    const root = useRef(document.querySelector('#root') as HTMLDivElement);
    const el = useRef(document.createElement('div') as HTMLDivElement);
    const childrenRef = useRef<HTMLDivElement>(null);
    const popperRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);
    const [contentWidth, setContentWidth] = useState(0);
    const [childrenPosition, setChildrenPosition] = useState<PopoverChildrenPosition>(INITIAL_CHILDREN_POSITION);
    const currentShow = controlShow === undefined ? show : controlShow;

    const handleContentClick = () => {
        controlShow === undefined && setShow(!show);

        onClick && onClick();
    };

    const ChildrenComponent = React.cloneElement(children as React.ReactElement, {ref: childrenRef, onClick: handleContentClick});

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

        if ((!contentWidth || popperWidth !== contentWidth) && currentShow) {
            setContentWidth(popperWidth);
        }
    });

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

        return currentShow ? ReactDOM.createPortal(
            <div className="popover-content-container" ref={popperRef} style={style}>
                <div className={`popover-body ${popoverBodyClassName || ''}`}>
                    {content}
                </div>
            </div>,
            el.current
        ) : null;
    };

    return (
        <>
            {ChildrenComponent}
            {renderPopover()}
        </>
    );
};

export default Popover;
