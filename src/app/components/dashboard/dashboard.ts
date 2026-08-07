import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  getName: string | null = localStorage.getItem('studyflow_user_name');

  ngOnInit(): void {
    // 
  }
}