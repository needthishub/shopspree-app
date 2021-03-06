import {CustomerInformationField} from "../../constants/user";
import React from "react";
import {ProductPurchase} from "../../store/reducers/userReducer";
import {History} from "history";

export interface CustomerInformationProps {
    cart: ProductPurchase[];
    history: History;

    cleanCart(): any;
}

export type CustomerInformationFieldRefs = {
    [field in CustomerInformationField]: React.RefObject<HTMLInputElement>
}
