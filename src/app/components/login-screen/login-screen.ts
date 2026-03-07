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

  hidePassword: boolean = false;
   
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
}
