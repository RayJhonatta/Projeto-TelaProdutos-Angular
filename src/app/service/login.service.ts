import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Login, LoginRequest, NewLogin } from "../models/login.model";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
}) 

export class LoginService {

    private http = inject(HttpClient);
    private readonly loginUrl = 'http://127.0.0.1:8000/api/login';
    private readonly personUrl = 'http://127.0.0.1:8000/api/person';

    login(login: LoginRequest): Observable<Login> {
        return this.http.post<Login>(`${this.loginUrl}`, login);
    }

    getLogin(): Observable<Login[]> {
        return this.http.get<Login[]>(this.personUrl);
    }
    
    addLogin(login: NewLogin): Observable<Login> {
        return this.http.post<Login>(this.personUrl, login);
    }
    
    updateLogin(login: Login): Observable<Login> {
        return this.http.put<Login>(`${this.personUrl}/${login.id}`, login);
    }
    
    deleteLogin(loginId: number): Observable<void> {
        return this.http.delete<void>(`${this.personUrl}/${loginId}`);
    }
}