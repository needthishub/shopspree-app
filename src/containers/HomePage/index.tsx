import React from 'react';
import './style.css';
import {ShopQuality} from "../../components/ShopQuality";
import BestSeller from "../BestSeller";
import {Partners} from "../../components/Partners";

class HomePage extends React.Component {
    render() {
        return (
            <div className="homepage-container">
                <div className="cover-image"/>
                <ShopQuality/>
                <BestSeller/>
                <Partners/>
            </div>
        );
    }
}

export default HomePage;
