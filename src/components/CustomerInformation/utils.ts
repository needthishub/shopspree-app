import {CustomerInformationFieldRefs} from "./interface";
import {CUSTOMER_INFORMATION_FIELDS_LIST, CustomerInformationField} from "../../constants/user";
import React from "react";

export const initializeFieldRefs = () => {
    const refs = {} as CustomerInformationFieldRefs;

    Object.keys(CUSTOMER_INFORMATION_FIELDS_LIST).forEach(key => {
        const stateKey = key as CustomerInformationField;
        refs[stateKey] = React.createRef();
    });

    return refs;
}
