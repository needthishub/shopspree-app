import React from 'react';
import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import HomePage from "./containers/HomePage";
import AllProductsPage from "./containers/AllProductsPage";
import CheckoutPage from "./containers/CheckoutPage";
import {ROUTE} from "./constants/route";
import {HeaderNavigation} from "./components/HeaderNavigation";
import {applyMiddleware, createStore} from 'redux';
import {rootReducer} from "./store/rootReducer";
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import ProductDetailsAction from "./store/actions/productDetailsAction";
import startRootSaga from "./store/rootSaga";
import {composeWithDevTools} from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(startRootSaga);

store.dispatch({type: ProductDetailsAction.FETCH_PRODUCTS_DETAILS});

(window as any).shopspree = store;

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="app-container">
                    <HeaderNavigation/>
                    <Switch>
                        <Route exact component={CheckoutPage} path={ROUTE.CHECKOUT}/>
                        <Route exact component={AllProductsPage} path={ROUTE.ALL_PRODUCTS}/>
                        <Route exact component={HomePage} path={ROUTE.HOME}/>
                        <Redirect to={ROUTE.HOME}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
