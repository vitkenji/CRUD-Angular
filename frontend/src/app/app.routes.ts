import { Routes } from '@angular/router';
import { MainAppComponent } from './layout/main-app/main-app.component';
import { authGuard } from './guards/auth.guard';
import { deactivateGuard } from './guards/deactivate.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () =>
            import('./pages/login/login.component').then((m)=> m.LoginComponent)
    },
    {
        path: '',
        component: MainAppComponent,
        children: [
            ...['', 'dashboard'].map((path) => ({
                path,
                loadComponent: () =>
                    import('./pages/dashboard/dashboard.component').then(
                        (m) => m.DashboardComponent
                    ),
                    canActivate: [authGuard],
                    canDeactivate: [deactivateGuard],
            }))
        ]

    }

];
