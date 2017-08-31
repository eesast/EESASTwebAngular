import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  TSQRshow: boolean;
  EDCQRshow: boolean;

  QROptions = {
    "size": "large",
    "type": "basic",
    "closeable": true
  }

  ngOnInit() {
    this.TSQRshow = false;
    this.EDCQRshow = false;
  }

  TSshow(){
    this.TSQRshow = true;
    console.log(this.TSQRshow);
  }

  TSclose(){
    this.TSQRshow = false;
  }

  EDCshow(){
    this.EDCQRshow = true;
  }

  EDCclose(){
    this.EDCQRshow = false;
  }

}
