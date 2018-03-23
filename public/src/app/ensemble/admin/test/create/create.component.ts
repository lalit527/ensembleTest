import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ServerService } from '../../../../services/index';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  filesToUpload: Array<File> = [];

  constructor(private server: ServerService) { }

  ngOnInit() {
  }

  createTest(form: NgForm){
     this.server.createTest(form)
         .subscribe(
           (response) => {
              console.log(response);
              if(this.filesToUpload.length>0){
                 this.upload(response.data._id);
              }
            },
           (error) => { console.log(error) }
         );
  }

  /*upload() {
      var formData: any = new FormData();
      var files: Array<File> = this.filesToUpload;
      for(let i =0; i < files.length; i++){
        formData.append("uploads", files[i], files[i]['name']);
      }
      for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]);
      }
      this.server.uploadFiles(formData)
       .subscribe(
         (response) => {console.log(response)},
         (error) => { console.log(error) }
       );
  }*/

  upload(id) {
    this.makeFileRequest("http://localhost:7777/question/add/file/"+id, id, this.filesToUpload).then((result) => {
        console.log(result);
    }, (error) => {
        console.error(error);
    });
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();
        console.log(files);
        for(var i = 0; i < files.length; i++) {
            formData.append("uploads", files[i], files[i].name);
        }
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.response);
                }
            }
        }
        xhr.open("POST", url, true);
        xhr.send(formData);
    });
}

  fileChangeEvent(fileInput) {
    console.log(fileInput.target.files);
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }



}
