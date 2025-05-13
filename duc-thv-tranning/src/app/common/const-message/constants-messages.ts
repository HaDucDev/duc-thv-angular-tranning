import { RegisterRequestDto } from "src/app/features/auth/auth.service";
import { ProductDto } from "src/app/features/management/product-management/product-management.service";
import { UserDto } from "src/app/features/management/user-management/user-management.service";

// register
export const REGISTER_VALIDATION_MESSAGES: any = {
    required: '{field} is required.',
    email: '{field} is not a valid email.',
    minlength: '{field} must be at least {requiredLength} characters.',
    passwordMismatch: 'Password and confirm password do not match.',
    pattern: {
        phonenumber: 'Phone number must be valid (10–11 digits).',
        default: '{field} format is invalid.'
    },
    usernameExists: 'Username already exists',
};

export const FIELD_LABELS_USER_REGISTER: RegisterRequestDto = {
    username: 'Username',
    email: 'Email',
    phonenumber: 'Phone number',
    firstname: 'First name',
    lastname: 'Last name',
    address: 'Address',
    password: 'Password',
    confirmPassword: 'Confirm password'
};

//user
export const USER_VALIDATION_MESSAGES: any = {
    required: '{field} is required.',
    email: '{field} is not a valid email.',
    minlength: '{field} must be at least {requiredLength} characters.',
    pattern: {
        phonenumber: 'Phone number must be valid (10–11 digits).',
        default: '{field} format is invalid.'
    },
};

export const FIELD_LABELS_USER: UserDto = {
    username: 'Username',
    password: 'Password',
    email: 'Email',
    phonenumber: 'Phone number',
    firstname: 'First name',
    lastname: 'Last name',
    address: 'Address',
    role: 'Role'
};

//product
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
    productExists: 'Product code already exists!',
};

export const FIELD_LABELS_PRODUCT: ProductDto = {
    code: 'Code',
    name: 'Product name',
    price: 'Price',
    quantity: 'Quantity',
    image: 'Image URL',
};