import React from 'react';
import {ProductFiltersProps} from "./interface";
import {ProductFilters} from "../../store/reducers/shopReducer";
import {upperCaseFirstLetter} from "../../utils/helper";
import Checkbox from "../../ui-components/Checkbox";
import './style.css';
import update from "immutability-helper";

export const AllProductsSideBar: React.FC<ProductFiltersProps> = ({
                                                                      productFilters,
                                                                      userFilters,
                                                                      onUpdateUserFilters
                                                                  }) => {

    const handleFilterChange = (filterCategory: string, filterValue: string) => (value: boolean) => {
        let newUserFilters: ProductFilters;

        if (value) {
            newUserFilters = update(userFilters, {[filterCategory]: {$push: [filterValue]}})
        } else {
            newUserFilters = update(userFilters,
                {
                    [filterCategory]: {
                        $set: userFilters[filterCategory as keyof ProductFilters].filter(val => val !== filterValue)
                    }
                })
        }

        onUpdateUserFilters(newUserFilters);
    }

    const renderFilters = () => {
        return Object.keys(productFilters).map(filterCategory => {
            const filterValues = productFilters[filterCategory as keyof ProductFilters];

            return (
                <div key={filterCategory} className="product-filter">
                    <p>{upperCaseFirstLetter(filterCategory)}</p>
                    {filterValues.map(filterValues => {
                        return (
                            <div key={filterValues} className="filter-checkbox">
                                <Checkbox
                                    onChange={handleFilterChange(filterCategory, filterValues)}>{filterValues}</Checkbox>
                            </div>
                        )
                    })}
                </div>
            );
        })
    }

    return (
        <div className="all-products-side-bar">
            {renderFilters()}
        </div>
    )
}
