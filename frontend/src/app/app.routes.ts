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
                    //canActivate: [authGuard],
                    //canDeactivate: [deactivateGuard],
            })),
            {
                path: 'users',
                loadComponent: () =>
                    import('./pages/users/users/users.component').then(
                        (m) => m.UsersComponent
                    ),
            },
            {
                path: 'create-user',
                loadComponent: () => 
                    import('./pages/users/create-user/create-user.component').then(
                        (m) => m.CreateUserComponent
                    )
            },
            {
                path: 'update-user',
                loadComponent: () => 
                    import('./pages/users/update-user/update-user.component').then(
                        (m) => m.UpdateUserComponent
                    )
            },
            {
                path: 'collaborators',
                loadComponent: () => 
                    import('./pages/collaborators/collaborators/collaborators.component').then(
                        (m) => m.CollaboratorsComponent
                    )
            },
            {
                path: 'create-collaborator',
                loadComponent: () => 
                    import('./pages/collaborators/create-collaborator/create-collaborator.component').then(
                        (m) => m.CreateCollaboratorComponent
                    )
            },
            {
                path: 'update-collaborator',
                loadComponent: () => 
                    import('./pages/collaborators/update-collaborator/update-collaborator.component').then(
                        (m) => m.UpdateCollaboratorComponent
                    )
            }

            
        ]

    }

];
