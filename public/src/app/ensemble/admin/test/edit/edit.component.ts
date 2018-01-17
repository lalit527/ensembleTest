import { Component, OnInit } from '@angular/core';
import { ServerService, TestEditService } from '../../../../services/index';
import { ActivatedRoute } from '@angular/router';
import {Header,Footer,Dialog} from 'primeng/primeng';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    errorMsg: any;

      displayDialog: boolean;
  
      question:Question = new PrimeQuestion();

      selectedQuestion: Question;
      
      newQuestion: boolean;
  
      questions:Question[];

      param: string;
      options1:any
  
      constructor(private server: ServerService, private route: ActivatedRoute,private editService:TestEditService) { }
  
      ngOnInit() {
          this.route.params.subscribe(params => {
            this.param = params['id'];
            console.log(this.param);
            this.server.testDetail(this.param)
                 .subscribe(
                   (data) => {
                     this.questions = data.data[0].questions;
                     console.log('hereeeeeeeeeeeeeeeee'+data.data[0].questions[0].options[0].option1);
                     console.log(this.questions);
                     this.options1 = data.data[0].questions[0].options[0].option1;
                     //console
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
            // this.editService.saveTest(this.questions)
            //     .subscribe(
            //         data => data
            //     ),
            //     error => this.errorMsg = <any>error;
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
  
  constructor(public question?, public answer?, public options?,option1?,option2?,option3?,option4?) {
      //question.option1 = options[0].option1
      options = [];

  }
}

export interface Question {
  question?;
  answer?;
  options?;
  option1?;
  option2?;
  option3?;
  option4?;
}