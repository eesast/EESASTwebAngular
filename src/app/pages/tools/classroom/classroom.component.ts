import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import * as _ from 'underscore';
import { ClassroomService } from "./classroom.service";

export interface IOption {
  id: number,
  building: string
}

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

//  buildingOptions:Array<string> = ['三教','六教','五教'];


  isSearchable: boolean;
  buildingOptions: IOption[];
  selectedOptions: IOption[];
  
  weeks: number[];
  days: number[];
  starts: number[];
  ends: number[];
  queryForm: FormGroup;

  classroomList: string[];

  submitting: boolean;

  constructor(private fb: FormBuilder,
              private classroomService: ClassroomService) {
    this.isSearchable = false;
  }

  ngOnInit() {
    this.buildingOptions = [
      {id: 1, building: "主楼后厅"},
      {id: 2, building: "建馆报告厅"},
      {id: 3, building: "建馆"},
      {id: 4, building: "西阶"},
      {id: 5, building: "东阶"},
      {id: 6, building: "工物馆"},
      {id: 7, building: "焊接馆"},
      {id: 8, building: "理科楼"},
      {id: 9, building: "精仪系系馆"},
      {id: 10, building: "旧水"},
      {id: 11, building: "新水"},
      {id: 12, building: "文北楼(文科楼)"},
      {id: 13, building: "旧经管报告厅"},
      {id: 14, building: "明理楼"},
      {id: 15, building: "一教"},
      {id: 16, building: "二教"},
      {id: 17, building: "三教"},
      {id: 18, building: "四教"},
      {id: 19, building: "五教"},
      {id: 20, building: "六教"},
      {id: 21, building: "经管伟伦楼"},
      {id: 22, building: "科技楼"},
      {id: 23, building: "清华学堂"},
      {id: 24, building: "美院"},
      {id: 25, building: "计算中心"},
      {id: 26, building: "生物馆"},
      {id: 27, building: "蒙楼(艺楼)"},
      {id: 28, building: "逸夫图书馆"},
      {id: 29, building: "金工"},
      {id: 30, building: "中"},      
    ];
    this.weeks = _.range(1,13);
    this.days = _.range(1,8);
    this.starts = _.range(1,7);
    this.ends = _.range(1,7);
    this.submitting = false;
    this.createQueryForm();
    this.classroomList = [];
    this.classroomService.getClassroomList().subscribe(data => {this.submitting = false; this.classroomList = data});
    console.log(this.buildingOptions);   
  }

  clear(){
    console.log(this.selectedOptions);
    this.selectedOptions = [];
    this.queryForm.reset();
  }

  createQueryForm(){
    this.queryForm = this.fb.group({
      'week':'',
      'day':'',
      'building':'',
      'start':'',
      'end':''
    });

    this.queryForm.controls['start'].valueChanges.subscribe(data =>{
        this.queryForm.controls['end'].setValue('');
        this.ends = _.range(this.queryForm.value['start']+1,7);      
      }
    )
  }

  submitSearch(data){
    this.submitting = true;
    console.log(data);
    let query = {
      'building':_.map(data.building, building => _.property('building')(building)),
      'week': data.week,
      'day': data.day,
      'order': _.range(+data.start,(+data.end)+1).map(num => num.toString())
    }
    console.log(query);
    this.classroomService.sentSearchQuery(query);
  }


}
