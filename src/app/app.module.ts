import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AppRoutingModule } from '../app/app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { ProjectService } from './shared/project.service';
import { ViewProjectComponent } from './projects/view-project/view-project.component';
import { ViewProjectsComponent } from './projects/view-projects/view-projects.component';
import { CreateTaskComponent } from './projects/create-task/create-task.component';
import { ViewTaskComponent } from './projects/view-task/view-task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CreateProjectComponent,
    ViewProjectComponent,
    ViewProjectsComponent,
    CreateTaskComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard, AuthService, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
