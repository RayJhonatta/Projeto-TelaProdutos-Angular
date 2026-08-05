import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Login, LoginRequest, NewLogin  } from '../../models/login.model';
import { LoginService } from '../../service/login.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-registration-screen',
    standalone: true,
    imports: [ ReactiveFormsModule, CommonModule],
    templateUrl: './registration-screen.html',
    styleUrls: ['./registration-screen.css'],
})
export class RegistrationScreen {

    hidePassword: boolean = false;
    private getData = inject(FormBuilder);
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

    onSubmit(event: Event) {  
      event.preventDefault();
        if (this.data.value.email === '' || this.data.value.password === '') {
          Swal.fire({
            icon: 'warning',
            title: 'Atenção',
            text: 'Campos obrigatórios não preenchidos!!',
            confirmButtonColor: '#9d886f'
          });
          return;
        }

        if (this.data.valid) {
          const register: LoginRequest = this.data.value as LoginRequest;

          this.service.login(register).subscribe({
            next: (resposta: any) => {
              const token = resposta?.email || register.email;
              const name = resposta?.name || register.email;
              
              localStorage.setItem('studyflow_token', token);
              localStorage.setItem('studyflow_user_name', name);

              Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Login realizado com sucesso!!',
                timer: 3000,
                showConfirmButton: false
              });
              this.data.reset();
              this.router.navigate(['/dashboard']); 
            }, 
            error: () => {
              Swal.fire({
                icon: 'error',
                title: 'Dados incorretos',
                text: 'E-mail ou senha incorretos. Por favor, verifique seus dados e tente novamente.',
                confirmButtonColor: '#9d886f'
              });
            }
          });
        }
    } 

    back() {
        this.router.navigate(['/login']);
    }
}