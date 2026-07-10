import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Login, LoginRequest, NewLogin } from "../models/login.model";
import { Observable, tap } from 'rxjs';
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
}) 

export class LoginService {
    private http = inject(HttpClient);

    private getBaseUrl(): string {
        return environment.apiUrl;
    }

    login(login: LoginRequest): Observable<Login> {
        return this.http.post<Login>(`${this.getBaseUrl()}/login`, login).pipe(
            tap((response: any) => {
                if (response && response.email) {
                    localStorage.setItem('studyflow_token', response.email);
                }
                console.log('Resposta real do Laravel:', response);
            })
        );
    }

    logout(): void {
        localStorage.removeItem('studyflow_token');
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