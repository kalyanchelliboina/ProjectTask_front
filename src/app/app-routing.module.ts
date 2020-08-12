import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from '../app/auth.service';
import { AuthGuard } from '../app/auth.guard';

import { LoginComponent } from '../app/login/login.component'
import { RegisterComponent } from '../app/register/register.component';
import { ProfileComponent } from '../app/profile/profile.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { ViewProjectComponent } from './projects/view-project/view-project.component';
import { ViewProjectsComponent } from './projects/view-projects/view-projects.component';
import { createComponent } from '@angular/compiler/src/core';
import { CreateTaskComponent } from './projects/create-task/create-task.component';
import { ViewTaskComponent } from './projects/view-task/view-task.component';

const routes: Routes = [
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'create-project',
        component: CreateProjectComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'view-project/:id',
        component: ViewProjectComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'view-projects',
        component: ViewProjectsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'create-task/:id',
        component: CreateTaskComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'view-task/:id',
        component: ViewTaskComponent,
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }