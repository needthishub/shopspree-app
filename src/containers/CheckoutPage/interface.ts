import {ProductPurchase} from "../../store/reducers/userReducer";
import {RouteComponentProps} from "react-router-dom";

export interface CheckoutPageStateProps {
    cart: ProductPurchase[];
}

export interface CheckoutPageOwnProps extends RouteComponentProps {

}

export interface CheckoutPageDispatchProps {
    cleanCart(): any;
}

export type CheckoutPageProps = CheckoutPageStateProps & CheckoutPageOwnProps & CheckoutPageDispatchProps;
