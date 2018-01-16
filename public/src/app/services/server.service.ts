import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { NgForm, FormGroup } from "@angular/forms";
import { Observable } from "rxjs/Observable";


@Injectable()
export class ServerService {
  headers = new Headers();

  constructor(private http: Http) {


   }
  
  private extractHeaders(response : Response){
      let headers = response.headers;
      return headers || {}
  }

  loginUser(form: FormGroup) {
    console.log(form.value);
    return this.http.post('http://localhost:3000/user/login', form.value);
  }

  signupUser(form: NgForm) {
    console.log(form.value);
    return this.http.post('http://localhost:3000/user/signup', form.value);
  }

  loginFb(data: any) {
    console.log(data);
    return this.http.post('http://localhost:3000/user/login/facebook', data);
  }

  getAllTest() {
    return this.http.get('http://localhost:3000/main/all/tests')
      .map(data => {
        data.json();
        return data.json();
      });

  }

  uploadFiles(files) {

    this.headers.append('Content-Type', undefined);
    return this.http.post('http://localhost:3000/main/upload', files, { headers: this.headers })
    //.map(files => files.json());
  }

  createTest(form: NgForm) {

     return this.http.post('http://localhost:3000/question/add/test', form.value)
                     .map(this.extractData)
                     .catch(this.handleError);
  }

  testDetail(id: string) {
    return this.http.get('http://localhost:3000/main/test/' + id)
      .map(data => {
        console.log(data);
        data.json();
        return data.json();
      });
  }

  getAllQuestion(subject, level) {
    return this.http.get('http://localhost:3000/main/singletest/' + subject + '/' + level)
    .map(this.extractData)
    .catch(this.handleError);
  }
  private extractData(response : Response){
    let body = response.json();
    return body || {}
}
private handleError(error:Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server Error')
}


}