import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
// import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../service/login.service';


@Component({
  selector: 'app-my-account',
  imports: [
    MatDialogModule,
    FormsModule
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

    this.loginService.getLogin().subscribe({
      next: (users: any[]) => {
        const user = users.find(u => u.email === loggedInEmail); 

        if(user) {
          this.name = user.name;
          this.email = user.email;
          this.cdr.detectChanges();
        }
      }
    });
  }

  closeModal() {
    this.dialogRef.close();
  }
}
