import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TakeTestComponent} from '../../../ensemble/take-test/take-test.component'

const routes: Routes = [
    {path:'take-test', component:TakeTestComponent}
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TakeTestRoutingModule {}