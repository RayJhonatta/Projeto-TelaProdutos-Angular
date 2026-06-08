import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Login, LoginRequest, NewLogin } from "../models/login.model";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
}) 

export class LoginService {
    private http = inject(HttpClient);

    private getBaseUrl(): string {
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        return isLocal 
            ? 'http://127.0.0.1:8000/api' 
            : 'https://projeto-telaprodutos-laravel-production.up.railway.app/api';
    }

    login(login: LoginRequest): Observable<Login> {
        return this.http.post<Login>(`${this.getBaseUrl()}/login`, login);
    }

    getLogin(): Observable<Login[]> {
        return this.http.get<Login[]>(`${this.getBaseUrl()}/person`);
    }
    
    addLogin(login: NewLogin): Observable<Login> {
        return this.http.post<Login>(`${this.getBaseUrl()}/person`, login);
    }
    
    updateLogin(login: Login): Observable<Login> {
        return this.http.put<Login>(`${this.getBaseUrl()}/person/${login.id}`, login);
    }
    
    deleteLogin(loginId: number): Observable<void> {
        return this.http.delete<void>(`${this.getBaseUrl()}/person/${loginId}`);
    }
}