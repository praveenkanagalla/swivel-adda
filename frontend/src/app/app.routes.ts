import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { Home } from './home/home';
import { About } from './about/about';
import { CheckoutComponent } from './checkout/checkout';
import { Prodects } from './prodects/prodects';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    // Auth route (no header/footer)
    {
        path: '',
        component: AuthLayout,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: Auth },
        ],
    },

    // Main routes (with header/footer)
    {
        path: '',
        component: MainLayout,
        canActivateChild: [authGuard],  // optional: protect all children after login
        children: [
            { path: 'home', component: Home },
            { path: 'about', component: About },
            { path: 'checkout', component: CheckoutComponent },
            { path: 'prodects', component: Prodects },
        ],
    },

    // Wildcard redirect
    { path: '**', redirectTo: 'login' },
];
