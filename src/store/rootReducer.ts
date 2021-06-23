import {combineReducers} from 'redux';
import {shopReducer} from "./reducers/shopReducer";
import {userReducer} from "./reducers/userReducer";
import {UserReducerAction} from "./actions/userAction";
import {ShopReducerAction} from "./actions/shopAction";

export const rootReducer = combineReducers({
    shop: shopReducer,
    user: userReducer
})

export type StoreStateType = ReturnType<typeof rootReducer>;

export type StoreAction = UserReducerAction | ShopReducerAction;
