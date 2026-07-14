import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
// import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../service/login.service';


@Component({
  selector: 'app-my-account',
  imports: [
    MatDialogModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './my-account.html',
  styleUrl: './my-account.css',
})
export class MyAccount implements OnInit {
 // private router = inject(Router);
  private dialogRef = inject(MatDialogRef);
  private loginService = inject(LoginService);
  private cdr = inject(ChangeDetectorRef);

  name: string = '';
  email: string = '';

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
          this.name = user.name;
          this.email = user.email;
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

  closeModal() {
    this.dialogRef.close();
  }
}
