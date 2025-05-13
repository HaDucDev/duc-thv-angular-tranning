import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDto, UserService } from '../user-management.service';
import { Router } from '@angular/router';
import { SelectedUserService, UserRefreshService } from '../user-list/user-list.service';
import { ErrorHelperService } from 'src/app/features/shared/modal-message/error-helper.service';
import { ModalService } from 'src/app/features/shared/modal-message/modal.service';
import { FIELD_LABELS_USER, USER_VALIDATION_MESSAGES } from 'src/app/common/const-message/constants-messages';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {

  userData: UserDto = {
    id: '',
    username: '',
    password: '',
    email: '',
    phonenumber: '',
    firstname: '',
    lastname: '',
    address: '',
    role: '',
  };

  userForm: FormGroup;
  isEditMode: boolean = false;
  isEditBtnShow: boolean = true;
  isControlBtnShow: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private selectedUserService: SelectedUserService,
    private userRefreshService: UserRefreshService,
    private userService: UserService,
    private modalService: ModalService,
    private errorHelperService: ErrorHelperService,
  ) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (currentUser.role === 'USER') {
      this.isEditBtnShow = false;
    }

    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      phonenumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,11}$')]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.loadDetailUser();
  }

  loadDetailUser() {
    this.selectedUserService.selectedUser$.subscribe(user => {
      if (user) {
        this.userData = { ...user };
        this.userForm.disable();
      }
    });
  }

  onEdit() {
    this.isEditMode = true;
    this.userForm.enable();
  }


  onCancelEdit() {
    this.isEditMode = false;
    this.loadDetailUser();
  }

  onClose() {
    this.router.navigate(['/user-management/user-card']);
  }

  onSave() {

    if (this.userForm.invalid) {
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

    // update user
    this.userService.updateUser(this.userData.id, this.userData).subscribe((updatedUser) => {
      this.selectedUserService.setUserDto(updatedUser);
      this.userRefreshService.triggerRefresh();
      this.router.navigate(['/user-management/user-card']);
    });
  }

  private getValidationErrors(): string[] {
    const errors: string[] = [];
    const controls = this.userForm.controls;
    for (const name in controls) {
      const control = controls[name];
      if (control && control.errors) {
        const field = FIELD_LABELS_USER[name] || name;
        for (const key in control.errors) {
          const extra = control.errors[key];
          errors.push(this.errorHelperService.getMessage(
            USER_VALIDATION_MESSAGES, key, field, extra, name
          ));
        }
      }
    }
    return errors;
  }

}
