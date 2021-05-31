import React from 'react';
import {ProductCardModalQuantityUIProps} from "./interface";

export const ProductCardModalQuantityUI: React.FC<ProductCardModalQuantityUIProps> = ({
                                                                                          quantity,
                                                                                          onClickAdd,
                                                                                          onClickMinus
                                                                                      }) => {
    return (
        <div className="quantity-container">
            <label className="quantity-container-label">
                <div><i className="fa fa-minus qty-button" onClick={onClickMinus}/></div>
                <span className="qty-value">QTY {quantity}</span>
                <div><i className="fa fa-plus qty-button" onClick={onClickAdd}/></div>
            </label>

        </div>
    );
}
