import { Injectable } from "@angular/core";
import { Headers, Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";

@Injectable()
export class QuestionService {
    
    constructor(private http: Http) { }
    getAllQuestion(subject,level) {
        return this.http.get('./assets/mock-questions.json')
        .map(this.extractData)
        .catch(this.handleError);
    }
    saveAnswers(data){
        return this.http.post('',data)
        .map(this.extractData)
        .catch(this.handleError)
    }
    getUserInfo() {
        return this.http.get('./assets/mock-user.json')
        .map(this.extractData)
        .catch(this.handleError);
    }
    getUserDetails(userId){
        return this.http.get('./assets/mock-user-details.json')
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