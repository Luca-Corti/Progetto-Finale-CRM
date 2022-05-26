import { Component, OnInit } from '@angular/core';
import { ClientiService } from '../Services/clienti.service';
import { UtentiService } from '../Services/utenti.service';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.scss']
})
export class UtentiComponent implements OnInit {
  dati:any;
  utenti!:any
  page:number=1;
  totalElements!:number

  constructor(private srv:UtentiService){ }

  getAllUsers(page:number){
    this.srv.getAllUsers(page - 1).subscribe((data)=>{
      this.dati = data
      this.totalElements = this.dati.totalElements
      this.utenti = this.dati.content
    })
  }
  log(){
    console.log(this.dati);
    console.log(this.utenti)
  }
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
    this.getAllUsers(this.page -1)

  }

}