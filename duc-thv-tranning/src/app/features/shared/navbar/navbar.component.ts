import { Component, OnInit } from '@angular/core';
import { AuthService, UserCurrentDto } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { SelectedProductService } from '../../management/product-management/product-list/product-list.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  currentUser: UserCurrentDto | null = null;
  usersDisable: boolean = false;
  productsDisable: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private selectedProductService: SelectedProductService,
  ) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.usersDisable = !!user && (user.role === 'ADMIN' || user.role === 'USER');
      this.productsDisable = !!user && (user.role === 'ADMIN' || user.role === 'USER' || user.role === 'CLIENT');
    });
  }

  logout(): void {
    this.authService.logout();
    this.selectedProductService.clearProductDto();
    this.router.navigate(['/login']);
  }
}
