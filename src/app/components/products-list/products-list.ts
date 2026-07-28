import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MyAccount } from '../my-account/my-account';
import { LoginService } from '../../service/login.service';
import { Login } from '../../models/login.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    MatDialogModule
  ],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsList implements OnInit {
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private loginService = inject(LoginService);
  userId!: number;
  getName = localStorage.getItem('studyflow_user_name');

  ngOnInit(): void {
    //
  }

  exit() {
    this.router.navigate(['/login']);
  }

  openModal() {
    this.dialog.open(MyAccount, {
      panelClass: 'custom-modal-studyflow'
    });
  }

  deleteAccount() {
    const getName = localStorage.getItem('studyflow_user_name');
    const storedId = localStorage.getItem('studyflow_user_id');
    const userId = Number(storedId);
    Swal.fire({
      title: 'Tem certeza?',
      text: `Olá ${getName}, tem certeza que deseja excluir sua conta??`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir minha conta!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginService.deleteLogin(userId).subscribe({
          next: () => {
              this.loginService.logout();
              Swal.fire({
                title: 'Deletado!!',
                text: 'Sua conta foi deletada com sucesso!!',
                icon: 'success',
                confirmButtonColor: '#bba486'
              }).then(() => {
                this.router.navigate(['/login']);
              })
          }
        }) 
      }
    }) 
  }
}
