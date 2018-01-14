import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EnsembleMainComponent } from "./ensemble/ensemble.component";
import { SignupFormComponent } from "./ensemble/signup/signup.component";
import { LoginComponent } from "./ensemble/login/login.component";
import { DashboardComponent } from "./ensemble/dashboard/dashboard.component";
import { TakeTestComponent } from "./ensemble/take-test/take-test.component";


const appRoutes: Routes = [
    {path: '', component: EnsembleMainComponent},
    {path:'signup', component: SignupFormComponent},
    {path:'login', component:LoginComponent},
    {path:'dashboard', component:DashboardComponent},
    {path:'take-test', component:TakeTestComponent}
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