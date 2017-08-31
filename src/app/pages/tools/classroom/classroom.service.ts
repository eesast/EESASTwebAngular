import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { baseURL } from '../../../shared/config';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";

@Injectable()
export class ClassroomService {

  classroomList: Subject<string[]>;


  constructor(private http: HttpClient) {
    this.classroomList = new Subject<string[]>();
  }

  getClassroomList(){
    return this.classroomList;
  }

  sentSearchQuery(queryBody: object){
    this.http.post(`${baseURL}/tools/classroom/`, queryBody).subscribe((data:string[]) => {
      console.log(data);
      this.classroomList.next(data);
    });
  }

}
