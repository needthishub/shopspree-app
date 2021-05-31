import {ProductVariantCompleteDetails} from "../../store/reducers/shopReducer";
import {VariantsOptionsAvailable} from "../../utils/product";
import {ProductPurchase} from "../../store/reducers/userReducer";

export interface ProductCardModalProps {
    show: boolean;
    initialVariant: ProductVariantCompleteDetails;
    variants: ProductVariantCompleteDetails[];
    variantsOptionsAvailable: VariantsOptionsAvailable;

    onClickOutsideModalBody(): void;

    addToCart(product: ProductPurchase): any;
}

export interface ProductCardModalState {
    selectedVariant: ProductVariantCompleteDetails;
    quantity: number;
}
