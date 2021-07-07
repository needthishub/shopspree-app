import React from 'react';
import './style.css';
import {ShopQuality} from "../../components/ShopQuality";
import BestSeller from "../BestSeller";
import {Partners} from "../../components/Partners";

const HomePage: React.FC = () => (
    <div className="homepage-container">
        <div className="cover-image"/>
        <ShopQuality/>
        <BestSeller/>
        <Partners/>
    </div>
);

export default HomePage;
