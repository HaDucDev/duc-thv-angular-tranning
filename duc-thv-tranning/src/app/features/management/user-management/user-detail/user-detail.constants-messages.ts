import { UserDto } from "../user-management.service";

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
