import {NgModule, Version, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common'
import {TakeTestComponent} from '../../../ensemble/take-test/take-test.component';
import {TakeTestRoutingModule} from './take-test.routing.module';
import {TimerComponent,ExamFinalAnswersComponent} from '../../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestGuardComponent } from '../../../ensemble/take-test/take-test-guarad.component';

@NgModule({
    imports:[CommonModule,TakeTestRoutingModule,FormsModule,ReactiveFormsModule],
    declarations:[TakeTestComponent,TimerComponent,ExamFinalAnswersComponent],
    exports:[TakeTestComponent,TimerComponent,ExamFinalAnswersComponent],
    providers:[TestGuardComponent],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class TakeTestModule{}