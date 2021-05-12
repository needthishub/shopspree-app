import {call, put, takeLatest} from 'redux-saga/effects';
import ProductDetailsAction from "../actions/productDetailsAction";
import ProductDetailsAPI from "../../api/productDetailsAPI";
import {ProductDetails} from "../reducers/productDetailsReducer";

function* workerFetchProductsDetailSaga() {
    const productDetailsAPI = new ProductDetailsAPI();
    const productDetilsAction = new ProductDetailsAction();
    try {
        const response = yield call(productDetailsAPI.getProducts);
        const productDetails = response.data as ProductDetails;

        yield put(productDetilsAction.set(productDetails))
    }catch (err) {
        // TODO: Change in the future
        console.log('err');
    }
}

export function* watchProductDetailsSaga() {
    yield takeLatest(ProductDetailsAction.FETCH_PRODUCTS_DETAILS, workerFetchProductsDetailSaga)
}
