import React from 'react';
import {connect, MapDispatchToPropsFunction, MapStateToProps} from "react-redux";
import {
    AllProductsDispatchToProps,
    AllProductsOwnProps,
    AllProductsPageProps,
    AllProductsStateProps
} from "./interface";
import {StoreStateType} from "../../store/rootReducer";
import {ProductCard} from "../../components/ProductCard";
import './style.css';
import ShopAction from "../../store/actions/shopAction";

class AllProductsPage extends React.Component<AllProductsPageProps> {
    componentDidMount() {
        const {shopProducts} = this.props;

        if (!shopProducts.products.length) {
            this.props.fetchShopProductsAndFilters();
        }
    }

    renderAllProducts = () => {
        const {shopProducts} = this.props;
        return shopProducts.products.map(({title, variants, id}) => {
                return (
                    <div key={id} className="product-item-container">
                        <ProductCard url={variants[0].image} name={title}/>
                    </div>
                )
            }
        )
    }

    render() {
        return (
            <div className="all-products-page-container">
                {this.renderAllProducts()}
            </div>
        );
    }
}

const mapStateToProps: MapStateToProps<AllProductsStateProps, AllProductsOwnProps, StoreStateType> = (state) => {
    const {shopProducts, productFilters} = state.Shop;
    return {
        shopProducts: shopProducts,
        productFilters: productFilters
    }
}

const mapDispatchToProps: MapDispatchToPropsFunction<AllProductsDispatchToProps, AllProductsOwnProps> = (dispatch) => {
    const {fetchShopProducts, fetchShopProductsAndFilters} = new ShopAction();
    return {
        fetchShopProducts: (options) => dispatch(fetchShopProducts(options)),
        fetchShopProductsAndFilters: () => dispatch(fetchShopProductsAndFilters()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsPage);
