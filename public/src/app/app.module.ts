import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import {RouterModule} from '@angular/router'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { EnsembleMainComponent } from './ensemble/ensemble.component';
import { TestDashboardComponent } from './ensemble/test-dashboard/test-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupFormComponent } from './ensemble/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './ensemble/login/login.component';
import { ServerService, SharedServices, QuestionService } from './services';
import { LoginService } from './ensemble/login/loginfb.service';
import {TakeTestModule} from './modules/test-module/take-test/take-test.module';
import { DashBoardComponent } from './ensemble/dashboard/dashboard.component';
import { SubmitAnswerComponent } from './shared/exam-final-answers/submit-answer-guard.component';
import { DeleteComponent } from './ensemble/admin/test/delete/delete.component';
import { EditComponent } from './ensemble/admin/test/edit/edit.component';
import { AdminComponent } from './ensemble/admin/admin.component';
import { TestComponent } from './ensemble/admin/test/test.component';
import { CreateComponent } from './ensemble/admin/test/create/create.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FileUploadModule,DataListModule} from 'primeng/primeng';
import {DataTableModule,SharedModule, DialogModule} from 'primeng/primeng';

export function getAuthHttp(http: Http) {
  return new AuthHttp(new AuthConfig({
    headerName: 'x-auth-token',
    noTokenScheme: true,
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('id_token')),
  }), http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EnsembleMainComponent,
    SignupFormComponent,
    LoginComponent,
    TestDashboardComponent,
    DashBoardComponent,
    DeleteComponent,
    EditComponent,
    AdminComponent,
    TestComponent,
    CreateComponent
    
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
    TakeTestModule,
    BrowserAnimationsModule,
    FileUploadModule,
    DataListModule,
    DataTableModule,
    SharedModule,
    DialogModule
  ],
  providers: [
    ServerService, 
    SharedServices,
    QuestionService,
    SubmitAnswerComponent,
    LoginService,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
