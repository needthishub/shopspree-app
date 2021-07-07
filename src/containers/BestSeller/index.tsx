import React, {Dispatch, useEffect} from 'react';
import {ProductCard} from "../../components/ProductCard";
import './style.css';
import {useDispatch, useSelector} from "react-redux";
import {BestSellerProps} from "./interface";
import {StoreAction, StoreStateType} from "../../store/rootReducer";
import ShopAction from "../../store/actions/shopAction";
import UserAction from "../../store/actions/userAction";
import {ProductPurchase} from "../../store/reducers/userReducer";

const BestSeller: React.FC<BestSellerProps> = () => {
    const bestSellerProducts = useSelector((state: StoreStateType) => state.shop.bestSellerProducts);
    const dispatch = useDispatch<Dispatch<StoreAction>>();
    const {fetchAllBestSellerProducts} = new ShopAction();
    const {addToCart} = new UserAction();

    useEffect(() => {
        if (!bestSellerProducts.length) {
            dispatch(fetchAllBestSellerProducts());
        }
    }, []);

    const handleAddToCart = (productPurchase: ProductPurchase) => {
        dispatch(addToCart(productPurchase));
    };

    const renderBestSellerProducts = () => {
        return bestSellerProducts.map((product) => {
            return (
                <ProductCard addToCart={handleAddToCart} product={product} key={product.id}/>
            );
        });
    };

    return (
        <div className="best-seller-container">
            <h2>Best Seller</h2>
            <div className="best-seller-products">
                {renderBestSellerProducts()}
            </div>
        </div>
    );
};

export default BestSeller;
