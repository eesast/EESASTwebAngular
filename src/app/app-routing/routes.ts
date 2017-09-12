import { Routes } from '@angular/router';

import { LoginComponent } from '../pages/login/login.component';
import { MainComponent } from '../pages/main/main.component';
import { RegisterComponent } from '../pages/register/register.component';
import { ToolsComponent } from '../pages/tools/tools.component';
import { CompetitionComponent } from '../pages/competition/competition.component';
import { ClassroomComponent } from '../pages/tools/classroom/classroom.component';
import { DepartmentComponent } from '../pages/department/department.component';


export const routes: Routes = [
    { path: 'main',  component: MainComponent },
    { path: 'login',  component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'tools', component: ToolsComponent },
    { path: 'competition', component: CompetitionComponent },
    { path: 'tools/classroom', component: ClassroomComponent },
    { path: 'aboutus/department', component: DepartmentComponent },
    { path: '', redirectTo: '/main', pathMatch: 'full' }
  ];
