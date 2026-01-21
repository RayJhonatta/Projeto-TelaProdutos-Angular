import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [MatSnackBarModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login-screen.html',
  styleUrls: ['./login-screen.css'],
})
export class LoginScreen {

  private formBuilder =  inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  dataForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  
  onSubmit() {
    if(this.dataForm.invalid) {
      this.snackBar.open('Formulário inválido! Verifique os campos.', 'Fechar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    } else {
      this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
      this.dataForm.reset();
    }
  } 

  showPassword: boolean = false;

  togglePassword() {
    const eye = document.querySelector('eye');
    const input = document.querySelector('#password') as HTMLInputElement;

    if (this.showPassword) {
      this.showPassword = false;
      if (eye) eye.classList.remove('visible');
      if (input) input.type = 'password';
    } else {
      this.showPassword = true;
      if (eye) eye.classList.add('visible');
      if (input) input.type = 'text';
    }
  }
}
