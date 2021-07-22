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

const url = 'https://shopspree-app-server.herokuapp.com';

class ShopAPI {
    getProducts = (options: GetProductsOptions) => {
        const {page, size, category} = options;
        const pageQueryParam = `page=${page || ''}`;
        const sizeQueryParam = `&size=${size || ''}`;
        const categoryQueryParam = `&category=${category ? category.join(`&category=`) : ''}`;
        return axios.get(`${url}/product/all?${pageQueryParam}${sizeQueryParam}${categoryQueryParam}`);
    }

    getProductFilters = () => {
        return axios.get(`${url}/product/filters`);
    }

    postOrder = (order: Order) => {
        const body = {
            order
        };

        return axios.post(`${url}/order`, body);
    }
}

export default ShopAPI;
