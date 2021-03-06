import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';


import { Observable , of } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class QueryService {

	ItemsUrl = "http://task.taj-it.com/api/Items";
  private urlHistory:object;

  constructor(
  	private http :HttpClient,   
  ) {}

  getData(path:string): Observable<any>{
  	return this.http.get(path);
  }

  postFile(fileToUpload: File) {
    const endpoint = 'http://task.taj-it.com/api/UploadImage';
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    return this.http
      .post(endpoint, formData);
  }

}