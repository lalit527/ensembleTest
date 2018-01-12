import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EnsembleMainComponent } from "./ensemble/ensemble.component";
import { SignupFormComponent } from "./ensemble/signup/signup.component";
import { LoginComponent } from "./ensemble/login/login.component";

const appRoutes: Routes = [
    {path: '', component: EnsembleMainComponent},
    {path:'signup', component: SignupFormComponent},
    {path:'login', component:LoginComponent}
];

@NgModule({
   imports: [
       RouterModule.forRoot(appRoutes)
   ],
   exports: [RouterModule]
})

export class AppRoutingModule {

}