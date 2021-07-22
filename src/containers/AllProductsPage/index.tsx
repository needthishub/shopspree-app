import React, {Dispatch, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AllProductsPageProps} from "./interface";
import {StoreAction, StoreStateType} from "../../store/rootReducer";
import {ProductCard} from "../../components/ProductCard";
import './style.css';
import ShopAction from "../../store/actions/shopAction";
import {AllProductsSideBar} from "../../components/AllProductsSideBar";
import UserAction from "../../store/actions/userAction";
import Pagination from "../../components/Pagination";
import {ProductFilters} from "../../store/reducers/shopReducer";
import {ProductPurchase} from "../../store/reducers/userReducer";
import {allProductsStoreEqualityFn} from "./utils";

const AllProductsPage: React.FC<AllProductsPageProps> = () => {
    const {shop, user} = useSelector<StoreStateType, StoreStateType>((state) => state, allProductsStoreEqualityFn);
    const dispatch = useDispatch<Dispatch<StoreAction>>();
    const {shopProducts, productFilters} = shop;
    const {filters: userFilters, shopProductsPage: userSelectedPage} = user;
    const {fetchShopProductsAndFilters} = new ShopAction();
    const {updateUserFilters, updateUserShopProductsPage, addToCart} = new UserAction();

    useEffect(() => {
        if (!shopProducts.products.length) {
            dispatch(fetchShopProductsAndFilters());
        }
    });

    const handleAddToCart = (productPurchase: ProductPurchase) => {
        dispatch(addToCart(productPurchase));
    };

    const renderAllProducts = () => {
        return shopProducts.products.map((product) => {
                return (
                    <div key={product.id} className="product-item-container">
                        <ProductCard
                            addToCart={handleAddToCart}
                            product={product}/>
                    </div>
                );
            }
        );
    };

    const handlePageChange = (selectedPage: number) => {
        if (userSelectedPage !== selectedPage) dispatch(updateUserShopProductsPage(selectedPage));
    };

    const handleUpdateUserFilters = useCallback((filters: ProductFilters) => {
        dispatch(updateUserFilters(filters));
    }, [updateUserFilters, dispatch]);

    return (
        <div className="all-products-page-container">
            <AllProductsSideBar productFilters={productFilters} onUpdateUserFilters={handleUpdateUserFilters}
                                userFilters={userFilters}/>
            <div className="all-products-container">
                <div className="all-products">
                    {renderAllProducts()}
                </div>
                <Pagination overrideSelectedPage={userSelectedPage} numberOfPages={shopProducts.totalPages}
                            onChange={handlePageChange}/>
            </div>
        </div>
    );
};

export default AllProductsPage;
