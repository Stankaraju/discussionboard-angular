import { Document } from './../../models/document.model';
import { FileUploadServiceService } from './../../services/file-upload-service.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http, RequestMethod, ResponseContentType, ResponseOptions, Headers, Response } from '@angular/http';
import { HttpEventType, HttpResponse, HttpClient } from '@angular/common/http';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-base64-upload',
  templateUrl: './base64-upload.component.html',
  styleUrls: ['./base64-upload.component.scss']
})
export class Base64UploadComponent implements OnInit {


  form: FormGroup;
  loading: boolean = false;
  fileuploadService;
  prodData;
  encodedString;
  formModel;
  myFiles: string[];
  filesToUpload: Array<File> = [];
  document = {
    'id': '',
    'name':'',
    'type': '',
    'content':''
  }

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder,
    private fileuploadservice: FileUploadServiceService, private http: HttpClient) {
    this.fileuploadService = fileuploadservice;

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

  getFiles(){
    this.prodData=[];
    this.http.get('http://localhost:8080/getAllDocuments').subscribe((res)=>{
      console.log(res);
      this.prodData=res;
    });
  }

  downloadFiles(){
    let id = this.document.id;
    this.http.get('http://localhost:8080/download-document/'+id).subscribe((res:any)=>{
     console.log(res);

    //  const blob = res.blob();
    //  const file = new Blob([blob],{});
    //  const filename = 'sample download';
    //  FileSaver.saveAs(file,filename);
    })
  }

  // download(document: Document){
  //   let id = this.document.id;
  //   this.http.post('http://localhost:8080/download-document/'+id,JSON.stringify(document),{
  //     method:RequestMethod.Post,
  //     responseType: ResponseContentType.Blob,
  //   })
  // }

  download(document: Document) { //get file from service
    let id = this.document.id;
    /*
    {
    responseType: ResponseContentType.Blob,
    headers: new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
}*
    
    this.http.get('http://localhost:8080/download-document/'+id).subscribe(
    (response) => { // download file
      
        var blob = new Blob([response.blob()], {type: 'application/pdf'});
        var filename = 'file.pdf';
        saveAs(blob, filename);
});*/

    // var headers = new Headers();
    // headers.append('Accept', 'application/pdf');
    // var options = new ResponseOptions({
    //     headers: headers
    // });
    // var response = new Response(options);
    // this.http.get('http://localhost:8080/download-document/'+id, response).map(res => res.arrayBuffer()).subscribe(r=>{
    //   console.log(r);
    // })

  }
  ngOnInit() {
  }

}








