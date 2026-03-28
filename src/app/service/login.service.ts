import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Login, NewLogin } from "../models/login.model";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
}) 

export class LoginService {

    private http = inject(HttpClient);
    private readonly url = 'http://127.0.0.1:8000/api/login'

    getLogin(): Observable<Login[]> {
        return this.http.get<Login[]>(`${this.url}/listar`);
    }

    addLogin(login: NewLogin): Observable<Login> {
        return this.http.post<Login>(`${this.url}/nova`, login) 
    }

    updateLogin(login: Login): Observable<Login> {
        return this.http.put<Login>(`${this.url}/editar/${login.id}`, login);
    }

    deleteLogin(loginId: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/deletar/${loginId}`);
    }
}