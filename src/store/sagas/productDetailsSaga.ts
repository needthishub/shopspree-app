import {call, put, takeLatest} from 'redux-saga/effects';
import ProductDetailsAction, {FetchShopProductsAction} from "../actions/productDetailsAction";
import ProductDetailsAPI from "../../api/productDetailsAPI";
import {ShopProducts} from "../reducers/productDetailsReducer";

function* workerFetchProductsDetailSaga(action: FetchShopProductsAction) {
    const productDetailsAPI = new ProductDetailsAPI();
    const productDetailsAction = new ProductDetailsAction();
    try {
        const response = yield call(productDetailsAPI.getProducts, action.options);
        const shopProducts = response.data as ShopProducts;

        yield put(productDetailsAction.setShopProducts(shopProducts))
    } catch (err) {
        // TODO: Change in the future
        console.log('err');
    }
}

export function* watchProductDetailsSaga() {
    yield takeLatest(ProductDetailsAction.FETCH_SHOP_PRODUCTS, workerFetchProductsDetailSaga)
}
