import React, {useEffect, useRef} from 'react';
import {ModalProps} from "./interface";
import ReactDOM from 'react-dom'
import './style.css';

export const Modal: React.FC<ModalProps> = ({onClickOutsideModalBody, show = true, modalBodyClassName, children}) => {
    const root = useRef(document.querySelector("#root") as HTMLDivElement);
    const el = useRef(document.createElement("div"));
    const currentRoot = root.current;
    const currentEl = el.current;

    useEffect(() => {
        currentRoot.appendChild(currentEl);
        return function cleanup() {
            currentRoot.removeChild(currentEl);
        };
    }, [currentRoot, currentEl]);

    const removerOnClickPropagation = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
    };

    const handleClickOutsideModalBody = () => {
        onClickOutsideModalBody && onClickOutsideModalBody();
    };

    return show ? ReactDOM.createPortal(
        <div onClick={removerOnClickPropagation} className="modal-container">
            <div onClick={handleClickOutsideModalBody} className="modal-overlay"/>
            <div className={`modal-body ${modalBodyClassName || ''}`}>
                {children}
            </div>
        </div>,
        currentEl
    ) : null;
};
