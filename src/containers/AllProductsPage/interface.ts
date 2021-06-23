import {ProductFilters, ShopProducts} from "../../store/reducers/shopReducer";
import {RouteComponentProps} from 'react-router-dom';
import {GetProductsOptions} from "../../api/shopAPI";
import {FetchShopProductsAction} from "../../store/actions/shopAction";
import {ProductPurchase} from "../../store/reducers/userReducer";

export interface AllProductsStateProps {
    shopProducts: ShopProducts;
    productFilters: ProductFilters;
    userFilters: ProductFilters;
    userSelectedPage: number;
}

export interface AllProductsPageProps extends RouteComponentProps {}

export interface AllProductsDispatchToProps {
    fetchShopProducts(options: GetProductsOptions): FetchShopProductsAction;

    fetchShopProductsAndFilters(): any;

    updateUserFilters(filters: ProductFilters): any;

    updateUserShopProductsPage(shopProductsPage: number): any;

    addToCart(product: ProductPurchase): any;
}
