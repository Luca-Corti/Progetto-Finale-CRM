import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  deleted:boolean=false
  constructor() { }
  deleteUser(){
    this.deleted=true;
    setTimeout(()=>{this.deleted=false;},2000);

  }
  ngOnInit(): void {
  }

}
