import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
// import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../service/login.service';
import { Login } from '../../models/login.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-account',
  imports: [
    MatDialogModule,
    FormsModule,
    CommonModule,
    MatSnackBarModule
  ],
  templateUrl: './my-account.html',
  styleUrl: './my-account.css',
})
export class MyAccount implements OnInit {
 // private router = inject(Router);
  private dialogRef = inject(MatDialogRef);
  private loginService = inject(LoginService);
  private cdr = inject(ChangeDetectorRef);
  private snackBar = inject(MatSnackBar);

  userId!: number;
  name: string = '';
  email: string = '';
  password: string = '';

  // Guardar valores 
  initialName: string = '';
  initialEmail: string = '';

  ngOnInit() {
    this.userData();
  }

  userData() {
    const loggedInEmail = localStorage.getItem('studyflow_token');
    const loggedInName = localStorage.getItem('studyflow_user_name');
    console.log('Buscando dados para o e-mail:', loggedInEmail);

    if (loggedInEmail && loggedInEmail.includes('@')) {
      this.email = loggedInEmail;
      this.name = loggedInName || '';
      this.cdr.detectChanges(); 
    }

    this.loginService.getLogin().subscribe({
      next: (users: any[]) => {
        console.log('Lista de usuários recebida com sucesso:', users);
        const user = users.find(u => u.email === loggedInEmail || u.name === loggedInName);

        if(user) {
          this.userId = user.id;
          this.name = user.name;
          this.email = user.email;

          this.initialName = user.name;
          this.initialEmail = user.email;


          localStorage.setItem('studyflow_token', user.email);
          localStorage.setItem('studyflow_user_name', user.name);
          this.cdr.detectChanges();
        } else {
          console.warn('E-mail correspondente não foi encontrado no banco.');
        }
      },
      error: (err) => {
        console.error('Erro de requisição na API:', err);
      }
    });
  }

  hasChanges() {
    const nameChanged = this.name.trim() !== this.initialName;
    const emailChanged = this.email.trim() !== this.initialEmail;
    const passwordTyped = this.password.trim().length > 0;

    return nameChanged || emailChanged || passwordTyped;
  }

  onSubmit() {
    this.savingData();
  }

  savingData() {
      const updatedUser: Partial<Login> = {
        id: this.userId,
        name: this.name,
        email: this.email,
        ...(this.password ? { password: this.password } : {}),
      };

      this.loginService.updateLogin(updatedUser as Login).subscribe({
          next: (response) => {
            localStorage.setItem('studyflow_token', this.email);
            localStorage.setItem('studyflow_user_name', this.name);

            this.snackBar.open('Perfil atualizado com sucesso!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });

            this.closeModal();
          },
          error: (err) => {
            console.error('Erro ao atualizar os dados do usuário:', err);
          }
      })
  }

  closeModal() {
    this.dialogRef.close();
  }
}
