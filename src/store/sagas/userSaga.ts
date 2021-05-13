import {call, put, takeLatest} from "redux-saga/effects";
import UserAction, {UpdateUserFiltersAction} from "../actions/userAction";
import ShopAction from "../actions/shopAction";
import ShopAPI from "../../api/shopAPI";
import {ShopProducts} from "../reducers/shopReducer";
import {convertFiltersToCategories} from "../../utils/helper";

function* workerUpdateUserFilterSaga(action: UpdateUserFiltersAction) {
    const shopAPI = new ShopAPI();
    const shopAction = new ShopAction();

    try {
        const response = yield call(shopAPI.getProducts, {category: convertFiltersToCategories(action.filters)});
        const shopProducts = response.data as ShopProducts;

        yield put(shopAction.setShopProducts(shopProducts))
    } catch (err) {
        // TODO: Change in the future
        console.log(err);
    }
}

export function* watchUserSaga() {
    yield takeLatest(UserAction.UPDATE_USER_FILTERS, workerUpdateUserFilterSaga)
}
