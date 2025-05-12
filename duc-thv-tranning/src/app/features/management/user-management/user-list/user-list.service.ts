import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { UserDto } from "../user-management.service";


@Injectable({ providedIn: 'root' })
export class SelectedUserService {

  private selectedUserSubject = new BehaviorSubject<UserDto | null>(null);
  selectedUser$: Observable<UserDto | null> = this.selectedUserSubject.asObservable();

  setUserDto(user: UserDto): void {
    this.selectedUserSubject.next(user);
  }

  getUserDto(): UserDto | null {
    return this.selectedUserSubject.getValue();
  }

  clearProductDto() {
    this.selectedUserSubject.next(null);
  }
}

@Injectable({ providedIn: 'root' })
export class UserRefreshService {
  private refreshNeeded = new Subject<void>();

  get refreshNeeded$() {
    return this.refreshNeeded.asObservable();
  }

  triggerRefresh() {
    this.refreshNeeded.next();
  }
}