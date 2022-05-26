import { Component, OnInit } from '@angular/core';
import { Fattura } from '../interfaces/fattura';
import { FattureService } from '../Services/fatture.service';

@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss']
})
export class FattureComponent implements OnInit {
dati:any;
fatture!:Fattura[]
page:number=1;
totalElements!:number
stati:any
colonnaId =
  {
    title: 'Id cliente',
    compare: (a:any, b: any) => a.id - b.id,
    priority: 1
  };
colonnaImporto =
  {
    title: 'Importo',
    compare: (a: any, b: any) =>{ if(a.importo && b.importo){return a.importo - b.importo}
                                          else{ return 1}},
    priority: 4
  };
  colonnaNumero =
  {
    title: 'Importo',
    compare: (a: any, b: any) =>{ if(a.numero && b.numero){return a.numero - b.numero}
                                          else{ return 1}},
    priority: 3
  };
  constructor(private srv:FattureService) { }
  log(){
    console.log(this.dati);
    console.log(this.fatture)
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
  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  getAllFatture(page:number){
    this.srv.getAllFatture(page - 1).subscribe((data)=>{
      this.dati = data
      this.totalElements = this.dati.totalElements
      this.fatture = this.dati.content
    })
  }
  getStatiFattura(){
    this.srv.getStatiFattura().subscribe((data)=>{
      this.stati=data
      this.stati=this.stati.content
    })
  }
  ngOnInit(): void {
    this.getAllFatture(this.page -1);
    this.getStatiFattura()
  }

}
