import React from 'react';
import {ShoppingCartProductProps} from "./interface";
import {getSubtotalPrice} from "../../utils/product";
import {upperCaseFirstLetter} from "../../utils/helper";
import './style.css';

export const ShoppingCartProduct: React.FC<ShoppingCartProductProps> = ({product, removeToCart}) => {
    const {title, image, size, color, quantity} = product;

    const subtotalPrice = getSubtotalPrice(product);

    const handleOnClickCloseButton = () => {
        removeToCart(product);
    };

    return (
        <div className="shopping-cart-product-container">
            <div className="image-container">
                <div className="product-image" style={{backgroundImage: `url(${image})`}}/>
            </div>
            <div className="product-details">
                <p className="product-name">{title}</p>
                <p>{size}</p>
                <p>{upperCaseFirstLetter(color)}</p>
                <p>QTY: {quantity}</p>
                <p className="sub-total">Subtotal: ${subtotalPrice}</p>
            </div>
            <div className="close-button" onClick={handleOnClickCloseButton}><i className="fas fa-times"/></div>
        </div>
    );
};
