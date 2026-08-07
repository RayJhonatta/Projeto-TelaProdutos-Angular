import { Routes } from '@angular/router';
import { LoginScreen } from './components/login-screen/login-screen';
import { Dashboard } from './components/dashboard/dashboard';
import { RegistrationScreen } from './components/registration-screen/registration-screen';
import { authGuard } from '../app/auth-guard';
import { Subject } from './components/subject/subject';
import { MainLayoutComponent } from './components/main-layout/main-layout';


export const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full' 
    },   
    { 
        path: 'login', 
        component: LoginScreen 
    }, 
    { 
        path: 'register', 
        component: RegistrationScreen 
    }, 
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
          { path: 'dashboard', component: Dashboard },
          { path: 'subject', component: Subject },
         // { path: 'task', component: Dashboard },  
         // { path: 'calendar', component: Dashboard } 
        ]
      }
];