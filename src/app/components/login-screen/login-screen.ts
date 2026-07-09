import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ProductsList } from '../products-list/products-list';
import { Router } from '@angular/router';
import { Login, NewLogin  } from '../../models/login.model';
import { LoginService } from '../../service/login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [MatSnackBarModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login-screen.html',
  styleUrls: ['./login-screen.css'],
})
export class LoginScreen {

  hidePassword: boolean = false;
  private getData = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private http = inject(HttpClient);
  private router = inject(Router);
  private loginService = inject(LoginService);
   
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
    'name': ['',  Validators.required],
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(8)]]
  });

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.data.value.name === '' || this.data.value.email === '' || this.data.value.password === '') {
      this.snackBar.open('Campos obrigatórios não preenchidos!!', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    if (this.data.invalid) {
      this.snackBar.open('Dados estão inválidos!! Por favor verifique os dados novamente!!', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return; 
    } 

    if (this.data.valid) {
      const newRegister: NewLogin = this.data.value as NewLogin;

      this.loginService.addLogin(newRegister).subscribe({
        next: (resposta: any) => { 
          this.snackBar.open('Cadastro realizado com sucesso!!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });

          if (resposta && resposta.token) {
            localStorage.setItem('studyflow_token', resposta.token);
          } else {
            localStorage.setItem('studyflow_token', 'token_temporario_cadastro'); 
          }

          this.data.reset();
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Erro ao cadastrar:', err);
          this.snackBar.open('Erro ao realizar cadastro!! Já existe um usuário com esses dados!!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      });
    }
  }

  login() {
    this.router.navigate(['/register']);
  }
}