import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'libs/src/shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

    /**
     *
     */
    constructor(private http: HttpClient) {
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>('/api/users');
    }

    deleteUser(username: string): Observable<void>{
        return this.http.delete<void>(`/api/users/${username}`);
    }
}