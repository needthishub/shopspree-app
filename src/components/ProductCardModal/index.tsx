import React from 'react';
import {ProductCardModalProps, ProductCardModalState} from "./interface";
import {Modal} from "../../ui-components/Modal";
import './style.css';
import {Button} from "../../ui-components/Button";
import {ProductCardModalVariantOptions} from "../ProductCardModalVariantOptions";
import {ProductCardModalQuantityUI} from "../ProductCardModalQuantityUI";
import {ProductCardModalPriceUI} from "../ProductCardModalPriceUI";

export class ProductCardModal extends React.Component<ProductCardModalProps, ProductCardModalState> {
    constructor(props: ProductCardModalProps) {
        super(props);

        this.state = {
            selectedVariant: props.initialVariant,
            quantity: 1,
        }
    }

    handleClickQuantityAddButton = () => {
        const {quantity, selectedVariant} = this.state;

        selectedVariant.stock > quantity && this.setState({quantity: quantity + 1});
    }

    handleClickQuantityMinusButton = () => {
        const {quantity} = this.state;

        quantity > 1 && this.setState({quantity: quantity - 1});

    }

    handleSizeChange = (size: string) => {
        const {selectedVariant} = this.state;
        const {variants} = this.props;

        if (selectedVariant.size !== size) {
            this.setState({
                selectedVariant: variants.filter(variant => variant.size === size && variant.stock > 0)[0]
            })
        }
    }

    handleColorChange = (color: string) => {
        const {selectedVariant} = this.state;
        const {variants} = this.props;

        if(selectedVariant.color !== color) {
            this.setState({
                selectedVariant: variants.filter(variant => variant.size === selectedVariant.size && variant.color === color && variant.stock > 0)[0]
            })
        }
    }

    handleAddToCart = () => {
        const {selectedVariant, quantity} = this.state;
        this.props.addToCart({...selectedVariant, quantity});
    }

    render() {
        const {show, onClickOutsideModalBody, variants, variantsOptionsAvailable} = this.props;

        const {selectedVariant, quantity} = this.state;
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
                        <ProductCardModalQuantityUI onClickAdd={this.handleClickQuantityAddButton}
                                                    onClickMinus={this.handleClickQuantityMinusButton}
                                                    quantity={quantity}/>
                        <ProductCardModalVariantOptions
                            variantsOptionsAvailable={variantsOptionsAvailable}
                            onSizeChange={this.handleSizeChange}
                            onColorChange={this.handleColorChange}
                            variants={variants}
                            selectedVariant={selectedVariant}/>
                        <Button
                            className="add-to-cart-button"
                            onClick={this.handleAddToCart}
                            type="primary"
                        >
                            Add To Card
                        </Button>
                    </div>
                </div>
            </Modal>
        );
    }
}
