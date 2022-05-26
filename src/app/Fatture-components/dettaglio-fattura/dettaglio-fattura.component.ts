import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FattureService } from 'src/app/Services/fatture.service';

@Component({
  selector: 'app-dettaglio-fattura',
  templateUrl: './dettaglio-fattura.component.html',
  styleUrls: ['./dettaglio-fattura.component.scss']
})
export class DettaglioFatturaComponent implements OnInit {
  fatturaDettaglio = this.fatSrv.fatturaDettaglio

  constructor(private router:Router, private fatSrv:FattureService) { }

  onBack(){
    this.router.navigate(['/fatture'])
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
    //this.router.navigate(['/fatture'])
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  ngOnInit(): void {
  }


}
