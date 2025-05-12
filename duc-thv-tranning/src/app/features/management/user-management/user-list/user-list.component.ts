import { Component, OnInit } from '@angular/core';
import { UserDto, UserService } from '../user-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedUserService, UserRefreshService } from './user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: UserDto[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalUsers: number = 0;
  isDeleteBtnShow: boolean = true;
  selectedUserId: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private selectedUserService: SelectedUserService,
    private userRefreshService :UserRefreshService,
  ) { }

  ngOnInit(): void {

    this.loadUsers();
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (currentUser.role === 'USER') {
      this.isDeleteBtnShow = false;
    }

    this.userRefreshService.refreshNeeded$.subscribe(() => {
      this.loadUsers(); // Hàm bạn dùng để reload table
    });

    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navEntries.length > 0 && navEntries[0].type === 'reload') {
      this.router.navigate(['/user-management']);
      this.selectedUserId = null;
    }
  }

  loadUsers() {
    this.userService.getUsersPage(this.currentPage, this.pageSize).subscribe((res) => {
      this.users = res.body!;
      this.totalUsers = +res.headers.get('X-Total-Count')!;
    });
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.selectedUserId = null;
    this.router.navigate(['/user-management']);
    this.loadUsers();
  }

  getTotalPages(): number[] {
    const totalPages = Math.ceil(this.totalUsers / this.pageSize);
    return Array(totalPages).fill(0).map((_, i) => i + 1);
  }

  viewCardUser(userDto: UserDto) {
    if (this.selectedUserId === userDto.id) {
      this.selectedUserId = null;
      this.router.navigate(['/user-management']);
      return;
    }
    this.selectedUserService.setUserDto(userDto);
    this.selectedUserId = userDto.id;
    this.router.navigate(['user-card'], { relativeTo: this.route });
  }

  isUserSelected(userDto: UserDto): boolean {
    return this.selectedUserId === userDto.id;
  }
}
