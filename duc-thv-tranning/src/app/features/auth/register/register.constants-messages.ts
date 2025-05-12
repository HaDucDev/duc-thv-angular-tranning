import { RegisterRequestDto } from "../auth.service";

export const REGISTER_VALIDATION_MESSAGES: any = {
    required: '{field} is required.',
    email: '{field} is not a valid email.',
    minlength: '{field} must be at least {requiredLength} characters.',
    passwordMismatch: 'Password and confirm password do not match.',
    pattern: {
        phonenumber: 'Phone number must be valid (10–11 digits).',
        default: '{field} format is invalid.'
    },
    usernameExists:'Username already exists',
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
