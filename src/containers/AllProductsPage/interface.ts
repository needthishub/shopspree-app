import {ProductFilters, ShopProducts} from "../../store/reducers/shopReducer";
import {RouteComponentProps} from 'react-router-dom';
import {GetProductsOptions} from "../../api/shopAPI";
import {FetchShopProductsAction} from "../../store/actions/shopAction";

export interface AllProductsStateProps {
    shopProducts: ShopProducts;
    productFilters: ProductFilters;
    userFilters: ProductFilters;
}

export interface AllProductsOwnProps extends RouteComponentProps {

}

export interface AllProductsDispatchToProps {
    fetchShopProducts(options: GetProductsOptions): FetchShopProductsAction;
    fetchShopProductsAndFilters(): any;
    updateUserFilters(filters: ProductFilters): any;
}

export type AllProductsPageProps = AllProductsStateProps & AllProductsOwnProps & AllProductsDispatchToProps;
