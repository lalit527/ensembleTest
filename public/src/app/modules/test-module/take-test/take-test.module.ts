import {NgModule, Version, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common'
import {TakeTestComponent} from '../../../ensemble/take-test/take-test.component';
import {TakeTestRoutingModule} from './take-test.routing.module';
import {TimerComponent} from '../../../shared'

@NgModule({
    imports:[CommonModule,TakeTestRoutingModule],
    declarations:[TakeTestComponent,TimerComponent],
    exports:[TakeTestComponent,TimerComponent],
    providers:[],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class TakeTestModule{}