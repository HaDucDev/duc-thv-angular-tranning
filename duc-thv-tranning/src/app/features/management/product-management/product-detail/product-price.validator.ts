import { AbstractControl, ValidationErrors } from '@angular/forms';

export function priceValidator(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value);
  if (value == null || value.trim() === '') {
    return { required: true };
  }

  const num = parseFloat(value);

  if (isNaN(num)) {
    return { invalidNumber: true };
  }

  if (num < 0.01) {
    return { min: { min: 0, actual: num } };
  }

  if (num > 1000000) {
    return { max: { max: 1000000, actual: num }  };
  }

  if (!/^\d{1,7}(\.\d{1,2})?$/.test(value)) {
    return { pattern: true };
  }

  return null;
}
