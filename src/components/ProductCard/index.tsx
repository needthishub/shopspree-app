import React from 'react';
import {ProductCardProps, ProductCardState} from './interface';
import './style.css';
import {ProductCardModal} from "../ProductCardModal";
import {getProductVariantDetails} from "../../utils/product";
import {ProductPurchase} from "../../store/reducers/userReducer";

export class ProductCard extends React.Component<ProductCardProps, ProductCardState> {
    constructor(props: ProductCardProps) {
        super(props);
        this.state = {
            showDetails: false,
        }
    }

    onClickProductCard = () => {
        this.setState({showDetails: true});
    }

    onClickOutsideModalBody = () => {
        this.setState({showDetails: false});
    }

    handleAddToCard = (product: ProductPurchase) => {
        this.props.addToCart(product);
        this.setState({showDetails: false});

    }

    render() {
        const {showDetails} = this.state;
        const {product, addToCart} = this.props
        const {initialVariant, variants, variantsOptionsAvailable} = getProductVariantDetails(product);

        return initialVariant ? (
            <div onClick={this.onClickProductCard} className="product-card-container">
                <div style={{backgroundImage: `url(${initialVariant.image})`}} className="product-image"/>
                <div className="product-details">
                    <p>{initialVariant.title}</p>
                </div>
                <ProductCardModal
                    onClickOutsideModalBody={this.onClickOutsideModalBody}
                    show={showDetails}
                    initialVariant={initialVariant}
                    variants={variants}
                    variantsOptionsAvailable={variantsOptionsAvailable}
                    addToCart={this.handleAddToCard}/>
            </div>
        ) : null;
    }
}

