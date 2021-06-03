import React from 'react';
import {InputProps} from "./interface";
import './style.css'

export const Input: React.FC<InputProps> = ({
                                                onChange,
                                                error,
                                                positive,
                                                inputStyle,
                                                inputContainerStyle,
                                                label,
                                                inputRef
                                            }) => {
    const overrideClassName = (error && 'error-ui') || (positive && 'positive-ui') || '';

    return (
        <div className="input-container" style={inputContainerStyle}>
            <div className="label">{label}</div>
            <input className={overrideClassName} ref={inputRef} style={inputStyle} onChange={onChange}/>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}
