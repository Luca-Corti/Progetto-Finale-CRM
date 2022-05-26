import { Component, OnInit } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { ClientiService } from '../Services/clienti.service';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent implements OnInit {
dati:any;
datiComune:any
datiProvincia:any
clienti!:Cliente[]
comuni!:any
province!:any
page:number=1;
totalElements!:number

colonnaId =
  {
    title: 'Id cliente',
    compare: (a:any, b: any) => a.id - b.id,
    priority: 1
  };
colonnaFatturato =
  {
    title: 'Fatturato annuale',
    compare: (a: any, b: any) =>{ if(a.fatturatoAnnuale && b.fatturatoAnnuale){return a.fatturatoAnnuale - b.fatturatoAnnuale}
                                          else{ return 1}},
    priority: 4
  };

  constructor(private srv:ClientiService) { }
  getAllClients(page:number){
    this.srv.getAllClients(page - 1).subscribe((data)=>{
      this.dati = data
      this.totalElements = this.dati.totalElements
      this.clienti = this.dati.content
    })
  }
  getAllComuni(){
    this.srv.getComuni().subscribe((data)=>{
      this.datiComune = data
      this.comuni = this.datiComune.content
    })
  }
  getAllProvince(){
    this.srv.getProvince().subscribe((data)=>{
      this.datiProvincia = data
      this.province = this.datiProvincia.content
    })
  }
  log(){
    console.log(this.dati);
    console.log(this.clienti)
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
  ngOnInit(): void {
    this.getAllClients(this.page -1)
    this.getAllComuni()
    this.getAllProvince()
  }

}
