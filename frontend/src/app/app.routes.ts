import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { MainAppComponent } from './layout/main-app/main-app.component';

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
                path: 'update-user/:id',
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
                        path: 'update-collaborator/:id',
                        loadComponent: () => 
                            import('./pages/collaborators/update-collaborator/update-collaborator.component').then(
                                (m) => m.UpdateCollaboratorComponent
                            )
                        },
                        {
                            path: 'create-address/:id',
                            loadComponent: () => 
                                import('./pages/create-address/create-address.component').then(
                                    (m) => m.CreateAddressComponent
                                )
                            },
                            {
                                path: 'create-telephone/:id',
                                loadComponent: () => 
                                    import('./pages/create-telephone/create-telephone.component').then(
                        (m) => m.CreateTelephoneComponent
                    )
                }
                
                
        ]
        
    },
    {
        path: 'error401',
        loadComponent: () =>
            import('./shared/error401/error401.component').then((m)=> m.Error401Component)
    },
    {
        path: '**',
        loadComponent: () =>
            import('./shared/error404/error404.component').then((m)=> m.Error404Component)
    },

];
