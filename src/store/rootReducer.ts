import {combineReducers} from 'redux';
import {ShopReducer} from "./reducers/shopReducer";
import {userReducer} from "./reducers/userReducer";

export const rootReducer = combineReducers({
    shop: ShopReducer,
    user: userReducer
})

export type StoreStateType = ReturnType<typeof  rootReducer>;
