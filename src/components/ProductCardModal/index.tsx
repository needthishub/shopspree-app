import React, {useState} from 'react';
import {ProductCardModalProps} from "./interface";
import {Modal} from "../../ui-components/Modal";
import './style.css';
import {Button} from "../../ui-components/Button";
import {ProductCardModalVariantOptions} from "../ProductCardModalVariantOptions";
import {ProductCardModalQuantityUI} from "../ProductCardModalQuantityUI";
import {ProductCardModalPriceUI} from "../ProductCardModalPriceUI";

export const ProductCardModal: React.FC<ProductCardModalProps> = ({initialVariant, show, onClickOutsideModalBody, variants, variantsOptionsAvailable, addToCart}) => {
    const [selectedVariant, setSelectedVariant] = useState( initialVariant);
    const [quantity, setQuantity] = useState(1);

    const handleClickQuantityAddButton = () => {
        selectedVariant.stock > quantity && setQuantity( quantity + 1);
    };

    const handleClickQuantityMinusButton = () => {
        quantity > 1 && setQuantity(quantity - 1);
    };

    const handleSizeChange = (size: string) => {
        if (selectedVariant.size !== size) {
            setSelectedVariant(variants.filter(variant => variant.size === size && variant.stock > 0)[0])
        }
    };

    const handleColorChange = (color: string) => {
        if(selectedVariant.color !== color) {
            setSelectedVariant(variants.filter(variant => variant.size === selectedVariant.size && variant.color === color && variant.stock > 0)[0])
        }
    };

    const handleAddToCart = () => {
        addToCart({...selectedVariant, quantity});
    };

    const {title, image} = selectedVariant;

    return (
            <Modal onClickOutsideModalBody={onClickOutsideModalBody} modalBodyClassName="product-card-modal-body"
                   show={show}>
                <div className="modal-product-details-container">
                    <div className="modal-product-image-container">
                        <div className="modal-product-image" style={{backgroundImage: `url(${image})`}}/>
                    </div>
                    <div className="modal-product-details">
                        <p className="modal-product-name">
                            {title}
                        </p>
                        <ProductCardModalPriceUI selectedVariant={selectedVariant}/>
                        <ProductCardModalQuantityUI onClickAdd={handleClickQuantityAddButton}
                                                    onClickMinus={handleClickQuantityMinusButton}
                                                    quantity={quantity}/>
                        <ProductCardModalVariantOptions
                            variantsOptionsAvailable={variantsOptionsAvailable}
                            onSizeChange={handleSizeChange}
                            onColorChange={handleColorChange}
                            variants={variants}
                            selectedVariant={selectedVariant}/>
                        <Button
                            className="add-to-cart-button"
                            onClick={handleAddToCart}
                            type="primary"
                        >
                            Add To Card
                        </Button>
                    </div>
                </div>
            </Modal>
        );
};
