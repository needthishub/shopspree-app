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
import {AllProductsSideBar} from "../../components/AllProductsSideBar";
import UserAction from "../../store/actions/userAction";

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
        const {productFilters, userFilters, updateUserFilters} = this.props;
        return (
            <div className="all-products-page-container">
                <AllProductsSideBar productFilters={productFilters} onUpdateUserFilters={updateUserFilters}
                                    userFilters={userFilters}/>
                <div className="all-products-container">{this.renderAllProducts()}</div>
            </div>
        );
    }
}

const mapStateToProps: MapStateToProps<AllProductsStateProps, AllProductsOwnProps, StoreStateType> = (state) => {
    const {shopProducts, productFilters} = state.shop;
    const {filters} = state.user;
    return {
        shopProducts: shopProducts,
        productFilters: productFilters,
        userFilters: filters
    }
}

const mapDispatchToProps: MapDispatchToPropsFunction<AllProductsDispatchToProps, AllProductsOwnProps> = (dispatch) => {
    const {fetchShopProducts, fetchShopProductsAndFilters} = new ShopAction();
    const {updateUserFilters} = new UserAction();
    return {
        fetchShopProducts: (options) => dispatch(fetchShopProducts(options)),
        fetchShopProductsAndFilters: () => dispatch(fetchShopProductsAndFilters()),
        updateUserFilters: (filters) => dispatch(updateUserFilters(filters)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsPage);
