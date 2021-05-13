import {combineReducers} from 'redux';
import {ShopReducer} from "./reducers/shopReducer";

export const rootReducer = combineReducers({
    Shop: ShopReducer
})

export type StoreStateType = ReturnType<typeof  rootReducer>;
