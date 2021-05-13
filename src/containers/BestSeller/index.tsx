import React from 'react';
import {ProductCard} from "../../components/ProductCard";
import './style.css';
import {connect, MapDispatchToPropsFunction, MapStateToProps} from "react-redux";
import {BestSellerDispatchProps, BestSellerProps, BestSellerStateProps} from "./interface";
import {StoreStateType} from "../../store/rootReducer";
import ShopAction from "../../store/actions/shopAction";

class BestSeller extends React.Component<BestSellerProps> {
    componentDidMount() {
        const {bestSellerProducts} = this.props;

        if (!bestSellerProducts.length) {
            this.props.fetchAllBestSellerProducts();
        }
    }

    renderBestSellerProducts = () => {
        const {bestSellerProducts} = this.props;

        return bestSellerProducts.map(({title, id, variants}) => {
            return (
                <ProductCard
                    key={id}
                    url={variants[0].image}
                    name={title}/>
            )
        })
    }

    render() {
        return (
            <div className="best-seller-container">
                <h2>Best Seller</h2>
                <div className="best-seller-products">
                    {this.renderBestSellerProducts()}
                </div>
            </div>
        )
    }
}

const mapStateToProps: MapStateToProps<BestSellerStateProps, {}, StoreStateType> = (state) => {
    return {
        bestSellerProducts: state.shop.bestSellerProducts
    }
}

const mapDispatchToProps: MapDispatchToPropsFunction<BestSellerDispatchProps, {}> = (dispatch) => {
    const {fetchAllBestSellerProducts} = new ShopAction();
    return {
        fetchAllBestSellerProducts: () => dispatch(fetchAllBestSellerProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BestSeller);
