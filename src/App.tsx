import React from 'react';
import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import HomePage from "./containers/HomePage";
import AllProductsPage from "./containers/AllProductsPage";
import CheckoutPage from "./containers/CheckoutPage";
import {ROUTE} from "./constants/route";
import {HeaderNavigation} from "./components/HeaderNavigation";

function App() {
    return (
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
    );
}

export default App;
