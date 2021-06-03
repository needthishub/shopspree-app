import axios from "axios";
import {ProductFilters} from "../store/reducers/shopReducer";
import {ProductPurchase} from "../store/reducers/userReducer";
import {CustomerInformationFieldsList} from "../constants/user";

export interface GetProductsOptions {
    page?: number;
    size?: number;
    category?: string[];
}

export interface ProductFiltersAPIResponse {
    productFilters: ProductFilters;
}

export interface Order {
    cart: ProductPurchase[];
    user: CustomerInformationFieldsList;
}

class ShopAPI {
    getProducts = (options: GetProductsOptions) => {
        const {page, size, category} = options;
        const pageQueryParam = `page=${page || ''}`;
        const sizeQueryParam = `&size=${size || ''}`;
        const categoryQueryParam = `&category=${category ? category.join(`&category=`) : ''}`;
        return axios.get(`http://localhost:1234/product/all?${pageQueryParam}${sizeQueryParam}${categoryQueryParam}`);
    }

    getProductFilters = () => {
        return axios.get('http://localhost:1234/product/filters');
    }

    postOrder = (order: Order) => {
        const body = {
            order
        };

        return axios.post('http://localhost:1234/order', body);
    }
}

export default ShopAPI;
