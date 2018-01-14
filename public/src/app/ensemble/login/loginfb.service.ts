import { Injectable } from "@angular/core";
import { AuthHttp } from "angular2-jwt";
import 'rxjs/add/operator/toPromise';
import { ServerService } from './../../services/server.service';

declare const FB:any;
@Injectable()
export class LoginService {
    constructor(private http: AuthHttp, private server: ServerService){
        FB.init({
            appId      : '225683797942567',
            status     : false, // the SDK will attempt to get info about the current user immediately after init
            cookie     : false,  // enable cookies to allow the server to access
            // the session
            xfbml      : false,  // With xfbml set to true, the SDK will parse your page's DOM to find and initialize any social plugins that have been added using XFBML
            version    : 'v2.8' // use graph api version 2.5
          });
    }

    fbLogin() {
        return new Promise((resolve, reject) => {
            FB.login(result => {
                if(result.authResponse){
                    this.server.loginFb(result.authResponse)
                        .toPromise()
                        .then(response => {
                            var token = response.headers.get('x-auth-token');
                            if(token){
                              localStorage.setItem('id_token', token);
                            }
                            resolve(response);
                        }).catch(() => {
                            reject();
                        });
                }
            }, {scope: 'public_profile,email'});
        });
    }
}