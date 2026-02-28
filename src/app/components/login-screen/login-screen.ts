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
  //
}
