import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserCredentials } from 'libs/src/shared/models/user-credentials.model';
import { User } from 'libs/src/shared/models/user.model';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const jwt = new JwtHelperService();

class DecodedToken {
    username = '';
    exp = 0;
}

@Injectable()
export class AuthService {
    private decodedToken;

    /**
     *
     */
    constructor(private http: HttpClient, private router : Router) {
        const meta = localStorage.getItem('app-meta');
        if (meta) {
            this.decodedToken = JSON.parse(meta);
        } else {
            this.decodedToken = new DecodedToken();
        }
    }

    getToken(): string | null {
        return localStorage.getItem('app-auth');
    }

    isAuthenticated(): boolean {
        return moment().isBefore(moment.unix(this.decodedToken.exp));
    }

    getAuthenticatedUsername(): string | null {
        //debugger
        const meta = localStorage.getItem('app-meta');
        if (meta) {
            const token: { username: string, exp: number, iat: number; } = JSON.parse(meta);
            return token.username;
        }
        return null;
    }

    signup(userData: User): Observable<User> {
        return this.http.post<User>('/api/auth/signup', userData);
    }

    signin(userCredentials: UserCredentials): Observable<{ accessToken: string; }> {
        return this.http.post<{ accessToken: string; }>('/api/auth/signin', userCredentials).pipe(map(
            (token) => {
                this.decodedToken = jwt.decodeToken(token.accessToken);
                localStorage.setItem('app-auth', token.accessToken);
                localStorage.setItem('app-meta', JSON.stringify(this.decodedToken));
                return token;
            }
        ));
    }

    signout(): void {
        localStorage.removeItem('app-auth');
        localStorage.removeItem('app-meta');
        this.decodedToken = new DecodedToken();

        this.router.navigate(['/signin']);
    }
}