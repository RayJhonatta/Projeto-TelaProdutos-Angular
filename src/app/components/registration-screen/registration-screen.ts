import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Login, NewLogin  } from '../../models/login.model';

@Component({
    selector: 'app-login-screen',
    standalone: true,
    imports: [MatSnackBarModule, ReactiveFormsModule, CommonModule],
    templateUrl: './registration-screen.html',
    styleUrls: ['./registration-screen.css'],
  })
export class RegistrationScreen {

    hidePassword: boolean = false;
    private getData = inject(FormBuilder);
    private snackBar = inject(MatSnackBar);
    private http = inject(HttpClient);
    private router = inject(Router);

    toggleSenha() {
        const input = document.getElementById('password') as HTMLInputElement;
    
        if (input.type === "password") {
            input.type = "text"
            this.hidePassword = true;
        } else {
          input.type = "password"
          this.hidePassword = false;
        }
    }

    data = this.getData.group({
        'email': ['', [Validators.required, Validators.email]],
        'password': ['', [Validators.required, Validators.minLength(8)]]
    });


     onSubmit() {
        if (this.data.invalid) {
          this.snackBar.open('Dados estão invalidos!! Por favor verifique os dados novamente!!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          return; 
        } 
  
        if(this.data.valid) {
            const newRegister: NewLogin = this.data.value as NewLogin

          this.http.post('http://127.0.0.1:8000/api/person', newRegister).subscribe({
            next: () => {
              this.snackBar.open('Cadastro realizado com sucesso!!', 'Fechar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
              })
                this.data.reset()
                this.router.navigate(['/dashboard']);
            }
          });
        }
    } 

    back() {
        this.router.navigate(['/login']);
    }
}