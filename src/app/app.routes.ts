import { Routes } from '@angular/router';
import { LoginScreen } from './components/login-screen/login-screen';
import { ProductsList } from './components/products-list/products-list';
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
        component: ProductsList, 
        canActivate: [authGuard] 
    }
];