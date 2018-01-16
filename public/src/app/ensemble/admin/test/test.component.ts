import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../../services';
import {Header,Footer} from 'primeng/primeng';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private server: ServerService, private router: Router, private route: ActivatedRoute) { }
  allTest: string;
  ngOnInit() {
    this.server.getAllTest()
        .subscribe(
          (response) => {
            
            this.allTest = response.data;
            //console.log('hereeeeeeeeeeeeeeeeee'+this.allTest);
          },
          (error) => {
            console.log(error);
          })
  }

  getTestDetails(id: string) {
    let url;
    this.route.parent.url.subscribe((urlPath) => {
         url = urlPath[urlPath.length - 1].path;
     })
    this.router.navigate([url, 'edit', id]);
  }

  

}
