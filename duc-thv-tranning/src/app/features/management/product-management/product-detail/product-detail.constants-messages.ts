import { ProductDto } from "../product-management.service";


export const PRODUCT_VALIDATION_MESSAGES: any = {
    required: '{field} is required.',
    email: '{field} is not a valid email.',
    minlength: '{field} must be at least {requiredLength} characters.',
    maxlength: '{field} must not exceed {requiredLength} characters.',
    pattern: {
        name: '{field} must not contain special characters.',
        price: '{field} must be a number with up to 2 decimal places, if present.',
        image: '{field} is not valid. Only JPG and PNG formats are accepted.',
        default: '{field} format is invalid.'
    },
    min: '{field} must be greater than {min}.',
    max: '{field} must be less than {max}.',
    productExists:'Product code already exists!',
};

export const FIELD_LABELS_PRODUCT: ProductDto = {
    code: 'Code',
    name: 'Product name',
    price: 'Price',
    quantity: 'Quantity',
    image: 'Image URL',
};
