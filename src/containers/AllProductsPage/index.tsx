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
import Pagination from "../../components/Pagination";

class AllProductsPage extends React.Component<AllProductsPageProps> {
    componentDidMount() {
        const {shopProducts} = this.props;

        if (!shopProducts.products.length) {
            this.props.fetchShopProductsAndFilters();
        }
    }

    renderAllProducts = () => {
        const {shopProducts, addToCart} = this.props;
        return shopProducts.products.map((product) => {
                return (
                    <div key={product.id} className="product-item-container">
                        <ProductCard
                            addToCart={addToCart}
                            product={product}/>
                    </div>
                )
            }
        )
    }

    handlePageChange = (selectedPage: number) => {
        const {userSelectedPage, updateUserShopProductsPage} = this.props;

        if (userSelectedPage !== selectedPage) updateUserShopProductsPage(selectedPage);
    }

    render() {
        const {productFilters, userFilters, updateUserFilters, shopProducts, userSelectedPage} = this.props;
        return (
            <div className="all-products-page-container">
                <AllProductsSideBar productFilters={productFilters} onUpdateUserFilters={updateUserFilters}
                                    userFilters={userFilters}/>
                <div className="all-products-container">
                    <div className="all-products">
                        {this.renderAllProducts()}
                    </div>
                    <Pagination overrideSelectedPage={userSelectedPage} numberOfPages={shopProducts.totalPages}
                                onChange={this.handlePageChange}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps: MapStateToProps<AllProductsStateProps, AllProductsOwnProps, StoreStateType> = (state) => {
    const {shopProducts, productFilters} = state.shop;
    const {filters, shopProductsPage} = state.user;
    return {
        shopProducts: shopProducts,
        productFilters: productFilters,
        userFilters: filters,
        userSelectedPage: shopProductsPage
    }
}

const mapDispatchToProps: MapDispatchToPropsFunction<AllProductsDispatchToProps, AllProductsOwnProps> = (dispatch) => {
    const {fetchShopProducts, fetchShopProductsAndFilters} = new ShopAction();
    const {updateUserFilters, updateUserShopProductsPage, addToCart} = new UserAction();
    return {
        fetchShopProducts: (options) => dispatch(fetchShopProducts(options)),
        fetchShopProductsAndFilters: () => dispatch(fetchShopProductsAndFilters()),
        updateUserFilters: (filters) => dispatch(updateUserFilters(filters)),
        updateUserShopProductsPage: (shopProductsPage) => dispatch(updateUserShopProductsPage(shopProductsPage)),
        addToCart: (productPurchase) => dispatch(addToCart(productPurchase)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsPage);
