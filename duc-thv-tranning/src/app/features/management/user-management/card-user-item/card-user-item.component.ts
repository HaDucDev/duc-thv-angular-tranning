import { Component, OnInit } from '@angular/core';
import { SelectedUserService, UserRefreshService } from '../user-list/user-list.service';
import { Router } from '@angular/router';
import { UserDto, UserService } from '../user-management.service';
import { AuthService } from 'src/app/features/auth/auth.service';
import { ModalService } from 'src/app/features/shared/modal-message/modal.service';

@Component({
  selector: 'app-card-user-item',
  templateUrl: './card-user-item.component.html',
  styleUrls: ['./card-user-item.component.css']
})
export class CardUserItemComponent implements OnInit {

  userDto: UserDto | null = null;
  isControlBtnShow: boolean = true;
  isNotRoleUsetBtnShow: boolean = true;

  constructor(
    private selectedUserService: SelectedUserService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private userRefreshService: UserRefreshService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.isControlBtnShow = !!user && (user.role === 'ADMIN' || user.role === 'USER');
      this.isNotRoleUsetBtnShow = !!user && !(user.role === 'USER');
    });

    this.selectedUserService.selectedUser$.subscribe(user => {
      if (user) {
        this.userDto = user;
      }
    });
  }

  openDetailUser(id: String): void {
    this.router.navigate(['/user-management/user-detail', id], {
      queryParams: { type: 'detail' }
    });
  }

  onDeleteUser(userDto: UserDto, event: Event) {
    event.preventDefault();

    this.modalService.confirmDelete(`Are you sure you want to delete the user "${userDto.firstname} ${userDto.lastname}"?`, 'Confirmation')
      .subscribe((confirmed) => {
        if (confirmed && userDto.id) {
            this.userService.deleteUser(userDto.id).subscribe(() => {
              this.userRefreshService.triggerRefresh();
              this.router.navigate(['/user-management']);
            }, () => {
              this.modalService.showModal(
                'Notification',
                'Failed to delete user',
                [{ label: 'Close', action: 'close', class: 'btn-secondary' }],
                [],
                'error'
              );
            });
          }
      });

  }

}
