import React from 'react';
import './style.css';

export const ShopQuality: React.FC = () => {
    return (
        <div className="shop-quality-container">
            <div className="quality-item-container">
                <div className="img-container support-local"/>
                <h3>Support Local</h3>
                <p>All materials come from local producers. Together we can create a stronger and better
                    community.</p>
            </div>
            <div className="quality-item-container">
                <div className="img-container high-quality"/>
                <h3>High Quality</h3>
                <p>Materials used are high quality proves to last for many years.</p>
            </div>
            <div className="quality-item-container">
                <div className="img-container eco-friendly"/>
                <h3>Eco Friendly</h3>
                <p>Rest assured that the proccess and materials used will never harm out enviroment.</p>
            </div>
        </div>
    );
};
