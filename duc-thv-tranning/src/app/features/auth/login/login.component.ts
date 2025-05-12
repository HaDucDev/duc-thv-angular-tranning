import { Component} from '@angular/core';
import { AuthService, LoginRequestDto } from 'src/app/features/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit(form: any) {
    if (form.valid) {
      const loginData: LoginRequestDto = {
        username: this.username,
        password: this.password
      };
      
      this.authService.login(loginData).subscribe(user => {
      if (user) {
        this.errorMessage = '';
        this.router.navigate(['/product-management']);
      } else {
        this.errorMessage = 'Wrong username or password';
      }
    });
    }
  }
}
