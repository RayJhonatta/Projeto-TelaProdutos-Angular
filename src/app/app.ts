import { Component, signal } from '@angular/core';
import { LoginScreen } from './components/login-screen/login-screen';

@Component({
  selector: 'app-root',
  imports: [LoginScreen],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tela-produtos-angular');
}
