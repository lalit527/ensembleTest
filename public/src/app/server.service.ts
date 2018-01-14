import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { NgForm, FormGroup } from "@angular/forms";


@Injectable()
export class ServerService {
   constructor(private http: Http){

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
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
    }
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };
    return this.http.post('http://localhost:3000/user/login/facebook', data, requestOptions);
  }

}