import React from 'react';
import {Input} from "../../ui-components/Input";
import {Button} from "../../ui-components/Button";
import {
    CUSTOMER_INFORMATION_FIELD_ERROR,
    CUSTOMER_INFORMATION_FIELD_INITIAL_STATE,
    CUSTOMER_INFORMATION_FIELD_WIDTH,
    CUSTOMER_INFORMATION_FIELDS_LIST,
    CustomerInformationField,
    CustomerInformationFieldsList
} from "../../constants/user";
import {CustomerInformationFieldRefs, CustomerInformationProps, CustomerInformationState} from "./interface";
import './style.css';
import ShopAPI from "../../api/shopAPI";
import {omit} from "../../utils/helper";
import {Modal} from "../../ui-components/Modal";
import {ROUTE} from "../../constants/route";

class CustomerInformation extends React.Component<CustomerInformationProps, CustomerInformationState> {
    fieldRefs: CustomerInformationFieldRefs = {} as CustomerInformationFieldRefs;

    constructor(props: CustomerInformationProps) {
        super(props);

        this.state = {
            ...CUSTOMER_INFORMATION_FIELD_INITIAL_STATE,
            error: {...CUSTOMER_INFORMATION_FIELD_INITIAL_STATE},
            hasCompletePurchaseClick: false,
            showThankyouModal: false,
        }

        Object.keys(CUSTOMER_INFORMATION_FIELDS_LIST).forEach(key => {
            const stateKey = key as CustomerInformationField;
            this.fieldRefs[stateKey] = React.createRef();
        })

    }

    validateInputField = (field: CustomerInformationField, value: string) => {
        const errorMessage = value ? '' : CUSTOMER_INFORMATION_FIELD_ERROR;

        this.setState({
            error: {
                ...this.state.error,
                [field]: errorMessage,
            }
        })
    }

    handleInputOnChange = (field: CustomerInformationField) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const {hasCompletePurchaseClick} = this.state;
        const {value} = event.currentTarget;

        this.setState({
            [field]: value
        } as CustomerInformationFieldsList);

        hasCompletePurchaseClick && this.validateInputField(field, value);

    }

    renderInputFields = () => {
        const {error} = this.state;

        return Object.keys(CUSTOMER_INFORMATION_FIELDS_LIST).map(field => {
            const customerInfoField = field as CustomerInformationField;
            const label = CUSTOMER_INFORMATION_FIELDS_LIST[customerInfoField];

            return (
                <Input key={label}
                       inputContainerStyle={{marginBottom: '10px'}}
                       inputStyle={{width: CUSTOMER_INFORMATION_FIELD_WIDTH}}
                       onChange={this.handleInputOnChange(customerInfoField)}
                       label={label}
                       error={error[customerInfoField]}
                       positive={!!this.state[customerInfoField]}
                       inputRef={this.fieldRefs[customerInfoField]}
                />
            )
        })
    };

    allFieldsAreValid = () => {
        let hasError = false;
        const error: CustomerInformationFieldsList = {
            ...CUSTOMER_INFORMATION_FIELD_INITIAL_STATE
        };

        let hasFocusToErrorField = false;

        Object.keys(CUSTOMER_INFORMATION_FIELDS_LIST).forEach(key => {
            const stateKey = key as CustomerInformationField;

            if (!this.state[stateKey]) {
                error[stateKey] = CUSTOMER_INFORMATION_FIELD_ERROR;
                hasError = true;

                if (!hasFocusToErrorField) {
                    hasFocusToErrorField = true;
                    const fieldRef = this.fieldRefs[stateKey];
                    fieldRef.current && fieldRef.current.focus();
                }
            }
        });

        this.setState({error});

        return !hasError;
    }

    handleButtonClick = () => {
        const {cart} = this.props;
        this.setState({hasCompletePurchaseClick: true})
        if (this.allFieldsAreValid()) {
            const shopApi = new ShopAPI();

            shopApi.postOrder({
                cart,
                user: {
                    ...omit(this.state, ['error', 'hasCompletePurchaseClick'])
                }
            }).then(() => {
                this.setState({showThankyouModal: true});
            })
        }
    }

    handleShopMoreClick = () => {
        const {cleanCart, history} = this.props;

        cleanCart();
        history.push(ROUTE.ALL_PRODUCTS)
    }

    render() {
        const {showThankyouModal} = this.state;
        return (
            <div className="customer-info-container">
                <div className="heading">Billing Information</div>
                {this.renderInputFields()}
                <Button className="complete-purchase-btn"
                        style={{width: CUSTOMER_INFORMATION_FIELD_WIDTH}}
                        type="primary"
                        onClick={this.handleButtonClick}>Complete Purchase</Button>
                <Modal modalBodyClassName="customer-info-modal-body" show={showThankyouModal}>
                    <div className="header">Thank You! We have received your order!</div>
                    <p>Please wait 5 to 10 business days for your items to arrived.</p>
                    <Button type="primary" onClick={this.handleShopMoreClick}>Shop More</Button>
                </Modal>
            </div>
        );
    }
}

export default CustomerInformation;
