import { Routes } from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {AuthService} from './services/auth/auth.service';
import {AuthGuard} from './services/auth/auth-guard';
import {HomePageComponent} from './pages/home-page/home-page.component';

export const routes: Routes = [
  { path: 'login', component: LoginPageComponent},
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard]  }, // Página principal
  { path: '**', redirectTo: 'home', pathMatch: 'full' } // Redirige a homePage en caso de URL errónea
];
