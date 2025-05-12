import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../features/auth/login/login.component';
import { RegisterComponent } from '../features/auth/register/register.component';
import { UserManagementComponent } from '../features/management/user-management/user-management.component';
import { AboutComponent } from '../features/shared/about/about.component';
import { AuthGuard } from '../config/auth.guard';
import { UnauthorizedComponentComponent } from '../features/shared/unauthorized-component/unauthorized-component.component';
import { ProductManagementComponent } from '../features/management/product-management/product-management.component';
import { EmptyProductDetailComponent } from '../features/management/product-management/empty-product-detail/empty-product-detail.component';
import { ProductDetailComponent } from '../features/management/product-management/product-detail/product-detail.component';
import { CardProductItemComponent } from '../features/management/product-management/card-product-item/card-product-item.component';
import { EmptyUserDetailComponent } from '../features/management/user-management/empty-user-detail/empty-user-detail.component';
import { CardUserItemComponent } from '../features/management/user-management/card-user-item/card-user-item.component';
import { UserDetailComponent } from '../features/management/user-management/user-detail/user-detail.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponentComponent
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: { roles: ['USER', 'ADMIN'] },
    children: [
      {
        path: '',
        component: EmptyUserDetailComponent
      },
      {
        path: 'user-card',
        component: CardUserItemComponent
      },
      {
        path: 'user-detail',
        component: UserDetailComponent
      }
    ]
  },
  {
    path: 'product-management',
    component: ProductManagementComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: { roles: ['USER', 'ADMIN', 'CLIENT'] },
    children: [
      {
        path: '',
        component: EmptyProductDetailComponent
      },
      {
        path: 'product-card',
        component: CardProductItemComponent,
      },
      {
        path: 'product-detail/add',
        component: ProductDetailComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['USER', 'ADMIN'],
          mode: 'add'
        },
      },
      {
        path: 'product-detail/view',
        component: ProductDetailComponent,
        data: {
          mode: 'view'
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
