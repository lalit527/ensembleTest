import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EnsembleMainComponent } from "./ensemble/ensemble.component";
import { SignupFormComponent } from "./ensemble/signup/signup.component";
import { LoginComponent } from "./ensemble/login/login.component";
import { TestDashboardComponent } from "./ensemble/test-dashboard/test-dashboard.component";
import { TakeTestComponent } from "./ensemble/take-test/take-test.component";
import { DashBoardComponent } from "./ensemble/dashboard/dashboard.component";
import { ExamFinalAnswersComponent } from "./shared";
import { TestGuardComponent } from "./ensemble/take-test/take-test-guarad.component";
import { SubmitAnswerComponent } from "./shared/exam-final-answers/submit-answer-guard.component";
import { AdminComponent } from "./ensemble/admin/admin.component";
import { TestComponent } from "./ensemble/admin/test/test.component";
import { CreateComponent } from "./ensemble/admin/test/create/create.component";
import { EditComponent } from "./ensemble/admin/test/edit/edit.component";


const appRoutes: Routes = [
    {path: '', component: EnsembleMainComponent},
    {path:'signup', component: SignupFormComponent},
    {path:'login', component:LoginComponent},
    {path:'dashboard', component:DashBoardComponent},
    {path:'test-dashboard', component:TestDashboardComponent},
    {path:'take-test', component:TakeTestComponent, canActivate:[TestGuardComponent]},
    {path:'submit-answer',component:ExamFinalAnswersComponent,canActivate:[SubmitAnswerComponent] },
    {path:'take-test', component:TakeTestComponent},
    {path:'admin', component:AdminComponent, children: [
        {path:'test', component: TestComponent},
        {path:'create', component: CreateComponent },
        {path:'edit/:id', component: EditComponent }
    ]}
    //{path:'take-test', loadChildren:'app/modules/test-module/take-test/take-test.module#TakeTestModule'}
];

@NgModule({
   imports: [
       RouterModule.forRoot(appRoutes)
   ],
   exports: [RouterModule]
})

export class AppRoutingModule {

}