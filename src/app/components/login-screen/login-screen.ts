import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ProductsList } from '../products-list/products-list';
import { Router } from '@angular/router';
import { Login, NewLogin  } from '../../models/login.model';



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
        console.log(newRegister);

        this.snackBar.open('Cadastro realizado com sucesso!!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
          this.data.reset()
      }
  }
}
