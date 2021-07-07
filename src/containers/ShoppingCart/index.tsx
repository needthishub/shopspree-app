import React, {Dispatch, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ShoppingCartProps} from "./interface";
import {StoreAction, StoreStateType} from "../../store/rootReducer";
import './style.css';
import Popover from "../../ui-components/Popover";
import {Button} from "../../ui-components/Button";
import {ROUTE} from "../../constants/route";
import {Link} from 'react-router-dom';
import {ShoppingCartProduct} from "../../components/ShoppingCartProduct";
import UserAction from "../../store/actions/userAction";
import {ProductPurchase} from "../../store/reducers/userReducer";

const ShoppingCart: React.FC<ShoppingCartProps> = () => {
    const [showPopover, setShowPopover] = useState(false);
    const cart = useSelector((state: StoreStateType) => state.user.cart);
    const dispatch = useDispatch<Dispatch<StoreAction>>();
    const {removeToCart} = new UserAction();

    const handlePopoverClick = () => {
        cart.length && setShowPopover(!showPopover);
    };

    const handleRemoveToCart = (product: ProductPurchase) => {
        cart.length === 1 && setShowPopover(false);
        dispatch(removeToCart(product));
    };

    const getAllProducts = () => {
        return cart.map(product => (
            <ShoppingCartProduct key={`${product.productId}-${product.variantId}`}
                                 product={product}
                                 removeToCart={handleRemoveToCart}
            />));
    };

    const cartLength = cart.length;

    const notificationUI = cartLength ? (
        <div className="shop-cart-notification">{cartLength}</div>
    ) : null;

    const popoverContent = (
        <div className="shopping-cart-container-popover">
            <div className="shopping-cart-all-products">
                {getAllProducts()}
            </div>
            <Link to={ROUTE.CHECKOUT}
                  component={({navigate}) => <Button className="checkout-button" type="primary" onClick={() => {
                      navigate();
                      handlePopoverClick();
                  }}>Checkout</Button>}/>
        </div>
    );

    return (
        <Popover controlShow={showPopover} onClick={handlePopoverClick} content={popoverContent}
                 position="bottomleft">
            <div className="shopping-cart-container">
                <i className="nav-item fas fa-shopping-cart"/>
                {notificationUI}
            </div>
        </Popover>
    );
};

export default ShoppingCart;
