import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  imports: [],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsList implements OnInit {
  private router = inject(Router);

  exit() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    //
  }
}
