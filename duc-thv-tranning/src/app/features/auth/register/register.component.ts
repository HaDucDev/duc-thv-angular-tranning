import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterRequestDto } from 'src/app/features/auth/auth.service';
import { passwordMatchValidator } from 'src/app/features/auth/register/password-match.validator';
import { ModalService } from '../../shared/modal-message/modal.service';
import { FIELD_LABELS_USER_REGISTER, REGISTER_VALIDATION_MESSAGES } from 'src/app/features/auth/register/register.constants-messages';
import { ErrorHelperService } from '../../shared/modal-message/error-helper.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  userRegesterData: RegisterRequestDto = {
    username: '',
    password: '',
    email: '',
    phonenumber: '',
    firstname: '',
    lastname: '',
    address: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: ModalService,
    private errorHelperService: ErrorHelperService,
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      passwordGroup: new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(10)]),
        confirmPassword: new FormControl('', Validators.required)
      }, { validators: passwordMatchValidator }),
      email: new FormControl('', [Validators.required, Validators.email]),
      phonenumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {

    if (this.registerForm.invalid) {
      const errors = this.getValidationErrors();
      this.modalService.showModal(
        'Validation error',
        'Please check the following fields:',
        [{ label: 'Close', action: 'close', class: 'btn-secondary' }],
        errors,
        'error'
      );
      return;
    }

    this.authService.isUsernameTaken(this.userRegesterData.username).subscribe(user => {
      if (user) {
        this.modalService.showModal(
          'Validation error',
          'Please check the following fields:',
          [{ label: 'Close', action: 'close', class: 'btn-secondary' }],
          [REGISTER_VALIDATION_MESSAGES.usernameExists,],
          'error'
        );
        return;
      }

      this.authService.registerUser(this.userRegesterData).subscribe(() => {
        this.modalService.showModal(
          'Notification',
          'Registration successful!',
          [{ label: 'Close', action: 'close', class: 'btn-secondary' }],
          [],
          'success'
        );
        this.router.navigate(['/login']);
      });
    });
  }

  private getValidationErrors(): string[] {
    const errors: string[] = [];

    const controls = this.registerForm.controls;
    for (const name in controls) {
      const control = controls[name];

      if (control instanceof FormGroup) {
        const passwordControl = control.get('password');
        const confirmPasswordControl = control.get('confirmPassword');

        if (passwordControl && passwordControl.errors) {
          const field = FIELD_LABELS_USER_REGISTER['password'];
          for (const key in passwordControl.errors) {
            const extra = passwordControl.errors[key];
            errors.push(this.errorHelperService.getMessage(REGISTER_VALIDATION_MESSAGES, key, field, extra, 'password'));
          }
        }
        if (confirmPasswordControl && confirmPasswordControl.errors) {
          const field = FIELD_LABELS_USER_REGISTER['confirmPassword'];
          for (const key in confirmPasswordControl.errors) {
            const extra = confirmPasswordControl.errors[key];
            errors.push(this.errorHelperService.getMessage(REGISTER_VALIDATION_MESSAGES, key, field, extra, 'confirmPassword'));
          }
        }

        const pwGroupErrors = control.errors;
        if (pwGroupErrors && pwGroupErrors['passwordMismatch']) {
          errors.push(this.errorHelperService.getMessage(REGISTER_VALIDATION_MESSAGES, 'passwordMismatch', ''));
        }

      } else if (control && control.errors) {
        const field = FIELD_LABELS_USER_REGISTER[name] || name;
        for (const key in control.errors) {
          const extra = control.errors[key];
          errors.push(this.errorHelperService.getMessage(REGISTER_VALIDATION_MESSAGES, key, field, extra, name));
        }
      }
    }

    return errors;
  }

}
