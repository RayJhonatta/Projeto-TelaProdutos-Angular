import { Routes } from '@angular/router';
import { LoginScreen } from './components/login-screen/login-screen';
import { Dashboard } from './components/dashboard/dashboard';
import { RegistrationScreen } from './components/registration-screen/registration-screen';
import { authGuard } from '../app/auth-guard';

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
        path: 'dashboard', 
        component: Dashboard, 
        canActivate: [authGuard] 
    }
];