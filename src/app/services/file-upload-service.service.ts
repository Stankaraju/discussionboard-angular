import { Document } from './../models/document.model';
import { Headers, ResponseContentType, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class FileUploadServiceService {
  prodData: Object;
  filesToUpload: any;
  private _http;
  constructor(private http: HttpClient) {
    this._http = http;
   }

   onFileChange(event) {
    this.filesToUpload = <Array<File>>event.target.files;
    //this.onSubmit();
  }
  onSubmit() {
    let data = [];
    const files:Array<File> = this.filesToUpload;
    const fd = new FormData();
    for (var i = 0; i < files.length; i++) {
      fd.append('files', files[i]);
    }
    this.http.post('http://localhost:8080/documentupload', fd).subscribe((res) => {
      console.log(res);
      this.prodData = res;

    })

  }


}
  