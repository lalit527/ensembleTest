import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class TestEditService {

    constructor(private http: Http) { }

    saveTest(data) {
        return this.http.post('', data)
            .map(this.extractData)
            .catch(this.handleError);
    }
    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server Error')
    }
    private extractData(response: Response): any {
        let body = response.json();
        return body || {};
    }
}