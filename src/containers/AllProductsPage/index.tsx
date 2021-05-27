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
import {Button} from "../../ui-components/Button";
import Pagination from "../../components/Pagination";

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

    handlePageChange = (selectedPage: number) => {
        const {userSelectedPage, updateUserShopProductsPage} = this.props;

        if (userSelectedPage !== selectedPage) updateUserShopProductsPage(selectedPage);
    }

    render() {
        const {productFilters, userFilters, updateUserFilters, shopProducts, userSelectedPage} = this.props;
        return (
            <div className="all-products-page-container">
                <Button type="primary" onClick={() => {
                }}>Test</Button>
                <AllProductsSideBar productFilters={productFilters} onUpdateUserFilters={updateUserFilters}
                                    userFilters={userFilters}/>
                <div className="all-products-container">
                    <div className="all-products">
                        {this.renderAllProducts()}
                    </div>
                    <Pagination overrideSelectedPage={userSelectedPage} numberOfPages={shopProducts.totalPages} onChange={this.handlePageChange}/>
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
    const {updateUserFilters, updateUserShopProductsPage} = new UserAction();
    return {
        fetchShopProducts: (options) => dispatch(fetchShopProducts(options)),
        fetchShopProductsAndFilters: () => dispatch(fetchShopProductsAndFilters()),
        updateUserFilters: (filters) => dispatch(updateUserFilters(filters)),
        updateUserShopProductsPage: (shopProductsPage) => dispatch(updateUserShopProductsPage(shopProductsPage)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProductsPage);
