import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../../../services/index';
import { ActivatedRoute } from '@angular/router';
import {Header,Footer,Dialog} from 'primeng/primeng';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

      displayDialog: boolean;
  
      question:Question = new PrimeQuestion();

      selectedQuestion: Question;
      
      newQuestion: boolean;
  
      questions:Question[];

      param: string;
  
      constructor(private server: ServerService, private route: ActivatedRoute) { }
  
      ngOnInit() {
          this.route.params.subscribe(params => {
            this.param = params['id'];
            console.log(this.param);
            this.server.testDetail(this.param)
                 .subscribe(
                   (data) => {
                     console.log(data.data[0].questions); this.questions = data.data[0].questions;
                     console.log(this.questions.option[0]["option-A"]);
                    },
                   (error) => {console.log(error)}
                 );
          });
          
      }
      
      showDialogToAdd() {
           this.newQuestion = true;
           this.question = new PrimeQuestion();
           this.displayDialog = true;
      }
      
      save() {
          let questions = [...this.questions];
          if(this.newQuestion)
              questions.push(this.question);
          else
             questions[this.findSelectedCarIndex()] = this.question;
          
          this.questions = questions;
          this.question = null;
          this.displayDialog = false;
      }
      
      delete() {
          let index = this.findSelectedCarIndex();
          this.questions = this.questions.filter((val,i) => i!=index);
          this.question = null;
          this.displayDialog = false;
      }    
      
      onRowSelect(event) {
          this.newQuestion = false;
          this.question = this.cloneCar(event.data);
          this.displayDialog = true;
      }
      
      cloneCar(q: Question): Question {
          let qsn = new PrimeQuestion();
          for(let prop in q) {
            qsn[prop] = q[prop];
          }
          return qsn;
      }
      
      findSelectedCarIndex(): number {
          return this.questions.indexOf(this.selectedQuestion);
      }

}

class PrimeQuestion implements Question {
  
  constructor(public question?, public answer?, public option?) {}
}

export interface Question {
  question?;
  answer?;
  option?;
}