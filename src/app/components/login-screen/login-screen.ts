import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Dashboard } from '../dashboard/dashboard';
import { Router } from '@angular/router';
import { Login, NewLogin  } from '../../models/login.model';
import { LoginService } from '../../service/login.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-screen.html',
  styleUrls: ['./login-screen.css'],
})
export class LoginScreen {

  hidePassword: boolean = false;
  private getData = inject(FormBuilder);
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
      Swal.fire({
        icon: 'warning',
        title: 'Atenção',
        text: 'Campos obrigatórios não preenchidos!!',
        confirmButtonColor: '#9d886f'
      });
      return;
    }

    if (this.data.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Dados inválidos',
        text: 'Dados estão inválidos!! Por favor verifique os dados novamente!!',
        confirmButtonColor: '#9d886f'
      });
      return; 
    } 

    if (this.data.valid) {
      const newRegister: NewLogin = this.data.value as NewLogin;

      this.loginService.addLogin(newRegister).subscribe({
        next: (resposta: any) => { 
          const token = (resposta && resposta.email) ? resposta.email : newRegister.email;
          const name = (resposta && resposta.name) ? resposta.name : newRegister.name;

          localStorage.setItem('studyflow_token', token);
          localStorage.setItem('studyflow_user_name', name);
          
          Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Cadastro realizado com sucesso!!',
            timer: 3000,
            showConfirmButton: false
          });

          this.data.reset();
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Erro ao cadastrar:', err);
          
          localStorage.removeItem('studyflow_token');
          localStorage.removeItem('studyflow_user_name');
          
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao realizar cadastro!! Já existe um usuário com esses dados!!',
            confirmButtonColor: '#9d886f'
          });
        }
      });
    }
  }

  login() {
    this.router.navigate(['/register']);
  }
}