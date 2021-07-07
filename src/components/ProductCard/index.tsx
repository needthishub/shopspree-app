import React, {useState} from 'react';
import {ProductCardProps} from './interface';
import './style.css';
import {ProductCardModal} from "../ProductCardModal";
import {getProductVariantDetails} from "../../utils/product";
import {ProductPurchase} from "../../store/reducers/userReducer";
import {ThemeContext} from "../../context/ThemeContext";

export const ProductCard: React.FC<ProductCardProps> = ({product, addToCart}) => {
    const [showDetails, setShowDetails] = useState(false);

    const onClickProductCard = () => {
        setShowDetails(true);
    }

    const onClickOutsideModalBody = () => {
        setShowDetails(false);
    }

    const handleAddToCard = (product: ProductPurchase) => {
        addToCart(product);
        setShowDetails(false);
    }

    const {initialVariant, variants, variantsOptionsAvailable} = getProductVariantDetails(product);

    return (
        <ThemeContext.Consumer>
            {theme => (
                initialVariant ? (
                    <div onClick={onClickProductCard} className={`product-card-container ${theme}`}>
                        <div style={{backgroundImage: `url(${initialVariant.image})`}} className="product-image"/>
                        <div className="product-details">
                            <p>{initialVariant.title}</p>
                        </div>
                        <ProductCardModal
                            onClickOutsideModalBody={onClickOutsideModalBody}
                            show={showDetails}
                            initialVariant={initialVariant}
                            variants={variants}
                            variantsOptionsAvailable={variantsOptionsAvailable}
                            addToCart={handleAddToCard}/>
                    </div>
                ) : null
            )}
        </ThemeContext.Consumer>
    )
}

