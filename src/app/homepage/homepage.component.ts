import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor() { }
  status={
    name:'Online',
    color:'green'
  }
  changeStatus(value:string) {
    if(value=='Online'){this.status.name='Online';this.status.color='green'}
    else if(value=='Offline'){this.status.name='Offline';this.status.color='red'}
    else if(value=='ND'){this.status.name='Non disponibile';this.status.color='gold'}
    else if(value=='Invisibile'){this.status.name='Invisibile';this.status.color=''}
  }

  ngOnInit(): void {
  }

}
