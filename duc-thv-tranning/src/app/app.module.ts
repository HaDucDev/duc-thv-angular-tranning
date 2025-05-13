import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing/app-routing.module';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserManagementComponent } from './features/management/user-management/user-management.component';
import { AboutComponent } from './features/shared/about/about.component';
import { UnauthorizedComponentComponent } from './features/shared/unauthorized-component/unauthorized-component.component';
import { ProductManagementComponent } from './features/management/product-management/product-management.component';
import { NavbarComponent } from './features/shared/navbar/navbar.component';
import { CurrencyPipe } from '@angular/common';
import { ProductDetailComponent } from './features/management/product-management/product-detail/product-detail.component';
import { ProductListComponent } from './features/management/product-management/product-list/product-list.component';
import { EmptyProductDetailComponent } from './features/management/product-management/empty-product-detail/empty-product-detail.component';
import { CardProductItemComponent } from './features/management/product-management/card-product-item/card-product-item.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CurrencyFormatMoneyDirective } from './common/directives/currency-format-money.directive';
import { CardUserItemComponent } from './features/management/user-management/card-user-item/card-user-item.component';
import { EmptyUserDetailComponent } from './features/management/user-management/empty-user-detail/empty-user-detail.component';
import { UserDetailComponent } from './features/management/user-management/user-detail/user-detail.component';
import { UserListComponent } from './features/management/user-management/user-list/user-list.component';
import { ModalMessageComponent } from './features/shared/modal-message/modal-message.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserManagementComponent,
    AboutComponent,
    UnauthorizedComponentComponent,
    ProductManagementComponent,
    NavbarComponent,
    CurrencyFormatMoneyDirective,
    ProductDetailComponent,
    ProductListComponent,
    EmptyProductDetailComponent,
    CardProductItemComponent,
    CardUserItemComponent,
    EmptyUserDetailComponent,
    UserDetailComponent,
    UserListComponent,
    ModalMessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
