import {call, put, select, takeLatest} from "redux-saga/effects";
import UserAction, {UpdateUserFiltersAction, UpdateUserShopProductsPageAction} from "../actions/userAction";
import ShopAction from "../actions/shopAction";
import ShopAPI, {GetProductsOptions} from "../../api/shopAPI";
import {ShopProducts} from "../reducers/shopReducer";
import {convertFiltersToCategories} from "../../utils/helper";
import {StoreStateType} from "../rootReducer";
import {User} from "../reducers/userReducer";

function* workerUpdateUserFilterSaga(action: UpdateUserFiltersAction) {
    const shopAPI = new ShopAPI();
    const shopAction = new ShopAction();
    const userAction = new UserAction();

    try {
        const user: User = yield select((state: StoreStateType) => state.user);
        const newUserPage = 1;
        const options: GetProductsOptions = {
            page: 1,
            size: user.shopProductsSize,
            category: convertFiltersToCategories(action.filters),
        };

        const response = yield call(shopAPI.getProducts, options);
        const shopProducts = response.data as ShopProducts;

        yield put(shopAction.setShopProducts(shopProducts))
        yield put(userAction.updateUserShopProductsPage(newUserPage));
    } catch (err) {
        // TODO: Change in the future
        console.log(err);
    }
}

function* workerUpdateUserShopProductsPageSaga(action: UpdateUserShopProductsPageAction) {
    const shopApi = new ShopAPI();
    const shopAction = new ShopAction();

    try {
        const user: User = yield select((state: StoreStateType) => state.user);

        const options: GetProductsOptions = {
            page: action.shopProductsPage,
            size: user.shopProductsSize,
            category: convertFiltersToCategories(user.filters),
        };

        const response = yield call(shopApi.getProducts, options);
        const shopProducts = response.data as ShopProducts;

        yield put(shopAction.setShopProducts(shopProducts));
    } catch (err) {
        // TODO: Change in the future
        console.log(err);
    }
}

export function* watchUserSaga() {
    yield takeLatest(UserAction.UPDATE_USER_FILTERS, workerUpdateUserFilterSaga)
    yield takeLatest(UserAction.UPDATE_USER_SHOP_PRODUCTS_PAGE, workerUpdateUserShopProductsPageSaga)
}
