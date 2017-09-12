// import core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import angular material and flex layout related files
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { L_SEMANTIC_UI_MODULE } from 'angular2-semantic-ui';
import { SuiModule } from 'ng2-semantic-ui';


import 'hammerjs';

// import component
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RegisterComponent } from './pages/register/register.component';
import { ToolsComponent } from './pages/tools/tools.component';
import { CompetitionComponent } from './pages/competition/competition.component';
import { DepartmentComponent } from './pages/department/department.component';


// import service
import { UserService } from './user/services/user.service';
import { ClassroomService } from './pages/tools/classroom/classroom.service';

// import responsive form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import HTTP module related files
import { HttpModule } from '@angular/http';
import { baseURL } from './shared/config';
import { HttpClientModule } from '@angular/common/http';
import { ProcessHttpmsgService } from './shared/process-httpmsg.service';

// import router related files
import { AppRoutingModule } from './app-routing/app-routing.module';

// import Angular Cookie
import { CookieModule } from 'ngx-cookie';
import { ClassroomComponent } from './pages/tools/classroom/classroom.component';

import * as _ from 'underscore';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    ToolsComponent,
    CompetitionComponent,
    ClassroomComponent,
    DepartmentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SuiModule,
    CookieModule.forRoot(),
    L_SEMANTIC_UI_MODULE
  ],
  providers: [
    UserService,
    ProcessHttpmsgService,
    ClassroomService,
    {provide: 'baseURL', useValue: baseURL}
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginComponent
  ]
})
export class AppModule { }
