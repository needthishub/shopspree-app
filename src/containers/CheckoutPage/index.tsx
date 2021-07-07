import React, {Dispatch} from 'react';
import {CheckoutPageProps} from "./interface";
import {useDispatch, useSelector} from "react-redux";
import {StoreAction, StoreStateType} from "../../store/rootReducer";
import {getSubtotalPrice} from "../../utils/product";
import {CheckoutPageProduct} from "../../components/CheckoutPageProduct";
import './style.css';
import {Redirect} from "react-router-dom";
import {ROUTE} from "../../constants/route";
import CustomerInformation from "../../components/CustomerInformation";
import UserAction from "../../store/actions/userAction";
import {useHistory} from "react-router";

const CheckoutPage: React.FC<CheckoutPageProps> = () => {
    const cart = useSelector((state: StoreStateType) => state.user.cart);
    const dispatch = useDispatch<Dispatch<StoreAction>>();
    const {cleanCart} = new UserAction();
    const history = useHistory();

    const getCartDetails = () => {
        const cartItems: React.ReactNode[] = [];
        let totalPrice = 0;

        cart.forEach((product, index) => {
            if (index > 0) {
                cartItems.push(<div className="divider" key={`divider-${index}`}/>)
            }

            cartItems.push(<CheckoutPageProduct product={product} key={`${product.productId}-${product.variantId}`}/>);

            totalPrice += getSubtotalPrice(product);
        });

        return {
            cartItems,
            totalPrice
        };
    };

    const handleCleanCart = () => {
        dispatch(cleanCart());
    };

    const {totalPrice, cartItems} = getCartDetails();

    return cart.length ? (
        <div className="checkout-page-container">
            <div className="cart-items-container">
                <div className="cart-items-header">
                    <p>Items: {cart.length}</p>
                    <div className="shipping-container">
                        <i className="fas fa-truck"/>
                        <label>Free Shipping</label>
                    </div>
                </div>
                <div className="cart-items">
                    {cartItems}
                </div>
                <div className="cart-items-footer">
                    <div className="text">Total</div>
                    <div className="total-price">
                        ${totalPrice}
                    </div>
                </div>
            </div>
            <CustomerInformation history={history} cart={cart} cleanCart={handleCleanCart}/>
        </div>
    ) : <Redirect to={ROUTE.HOME}/>;
};

export default CheckoutPage;
