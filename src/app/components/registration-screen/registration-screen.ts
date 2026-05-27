import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Login, LoginRequest, NewLogin  } from '../../models/login.model';
import { LoginService } from '../../service/login.service';

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
    private service = inject(LoginService);

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
        if(this.data.valid) {
            const register:  LoginRequest = this.data.value as LoginRequest;

          this.service.login(register).subscribe({
            next: () => {
              this.snackBar.open('Cadastro realizado com sucesso!!', 'Fechar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
              })
                this.data.reset()
                this.router.navigate(['/dashboard']);
            }, error: () => {
                this.snackBar.open('Dados estão invalidos!! Por favor verifique os dados novamente!!', 'Fechar', {
                  duration: 3000,
                  horizontalPosition: 'center',
                  verticalPosition: 'top'
                });
                return; 
              }
          });
        }
    } 

    back() {
        this.router.navigate(['/login']);
    }
}