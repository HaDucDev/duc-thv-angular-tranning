import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/config/api.config';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface LoginRequestDto {
  username?: string;
  password?: string;
}

export interface RegisterRequestDto {
  username?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
  phonenumber?: string;
  firstname?: string;
  lastname?: string;
  address?: string;
}

export interface UserCurrentDto {
  id?: string;
  username?: string;
  password?: string;
  email?: string;
  phonenumber?: string;
  firstname?: string;
  lastname?: string;
  address?: string;
  created?: string; 
  role?: 'ADMIN' | 'USER' | 'CLIENT';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${API_URL}/users`;

  private currentUserSubject: BehaviorSubject<UserCurrentDto | null>;
  public currentUser$: Observable<UserCurrentDto | null>;

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    const parsedUser = savedUser ? JSON.parse(savedUser) : null;
    this.currentUserSubject = new BehaviorSubject<UserCurrentDto | null>(parsedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  login(credentials: LoginRequestDto): Observable<UserCurrentDto | null> {
    return this.http.get<UserCurrentDto[]>(`${this.apiUrl}?username=${credentials.username}&password=${credentials.password}`).pipe(
      map(users => users.length ? users[0] : null),  
      tap(user => {  
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
      })
    );
  }

  isUsernameTaken(username: string): Observable<boolean> {
    return this.http.get<UserCurrentDto[]>(`${this.apiUrl}?username=${username}`).pipe(
      map(users => users.length > 0)
    );
  }

  registerUser(data: RegisterRequestDto): Observable<UserCurrentDto> {
    return this.http.post<UserCurrentDto>(this.apiUrl, data);
  }

  loadCurrentUserFromLocalStorage(): void {
    const saved = localStorage.getItem('currentUser');
    const user = saved ? JSON.parse(saved) : null;
    this.currentUserSubject.next(user);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
