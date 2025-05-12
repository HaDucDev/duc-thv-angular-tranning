import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/config/api.config';

export interface UserDto {
    id?: string;
    username?: string;
    password?: string;
    email?: string;
    phonenumber?: string;
    firstname?: string;
    lastname?: string;
    address?: string;
    created?: string;
    role?: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private apiUrl = `${API_URL}/users`;

    constructor(private http: HttpClient) { }

    getUsers(): Observable<UserDto[]> {
        return this.http.get<UserDto[]>(this.apiUrl);
    }

    getUsersPage(page: number, limit: number = 5): Observable<HttpResponse<UserDto[]>> {
        const url = `${this.apiUrl}?_page=${page}&_limit=${limit}&_sort=created&_order=desc`;
        return this.http.get<UserDto[]>(url, { observe: 'response' });
    }

    getUserById(id: string): Observable<UserDto> {
        return this.http.get<UserDto>(`${this.apiUrl}/${id}`);
    }

    addUser(data: UserDto): Observable<UserDto> {
        return this.http.post<UserDto>(this.apiUrl, data);
    }

    updateUser(id: string, data: Partial<UserDto>): Observable<UserDto> {
        return this.http.patch<UserDto>(`${this.apiUrl}/${id}`, data);
    }

    deleteUser(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
