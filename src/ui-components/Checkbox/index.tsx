import React, {useState} from 'react';
import {CheckboxProps} from "./interface";
import './style.css';

const Checkbox: React.FC<CheckboxProps> = ({initialValue, onChange, children}) => {
    const [value, setValue] = useState(initialValue || false);

    const handleCheckboxClick = () => {
        const newValue = !value;
        setValue(newValue);

        onChange(newValue);
    }

    const iconClassName = value ? "far fa-check-square" : "far fa-square"

    return (
        <label className="checkbox-container" onClick={handleCheckboxClick}>
            <i className={`${iconClassName} checkbox-icon`}/>
            <span className="checkbox-children">{children}</span>
        </label>
    );
}

export default Checkbox;
