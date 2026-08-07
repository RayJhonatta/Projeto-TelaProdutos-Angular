import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MyAccount } from '../my-account/my-account';
import { LoginService } from '../../service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatDialogModule
  ],
  templateUrl: './main-layout.html', 
  styleUrl: './main-layout.css'  
})
export class MainLayoutComponent {
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private loginService = inject(LoginService);

  openModal() {
    this.dialog.open(MyAccount, {
      panelClass: 'custom-modal-studyflow'
    });
  }

  exit() {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Tem certeza que deseja sair da sua conta?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9d886f',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sim, sair!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('studyflow_token');
        localStorage.removeItem('studyflow_user_name');
        this.router.navigate(['/login']);
      }
    });
  }

  deleteAccount() {
    const getName = localStorage.getItem('studyflow_user_name');
    const userId = Number(localStorage.getItem('studyflow_user_id'));

    Swal.fire({
      title: 'Tem certeza?',
      text: `Olá ${getName}, tem certeza que deseja excluir sua conta?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginService.deleteLogin(userId).subscribe({
          next: () => {
            this.loginService.logout();
            localStorage.removeItem('studyflow_token');
            localStorage.removeItem('studyflow_user_name');
            this.router.navigate(['/login']);
          }
        });
      }
    });
  }

  dashboard() {
    this.router.navigate(['/dashboard']);
  }

  subject() {
    this.router.navigate(['/subject']);
  }

  task() {
    //
  }

  calendar() {
    //
  }
}