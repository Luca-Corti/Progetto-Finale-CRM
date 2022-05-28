import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { FattureService } from 'src/app/Services/fatture.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dettaglio-fattura',
  templateUrl: './dettaglio-fattura.component.html',
  styleUrls: ['./dettaglio-fattura.component.scss']
})
export class DettaglioFatturaComponent implements OnInit {
  fatturaDettaglio = this.fatSrv.fatturaDettaglio
  nomeAccount=this.authSrv.user.username
  width=environment.width
  modalWidth='60vw'
  constructor(private router:Router, private fatSrv:FattureService, private authSrv:AuthService) { }

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
  logout(){
    this.authSrv.logout()
  }
  ngOnInit(): void {
    if(this.width<400){this.modalWidth='100vw'}
  }


}
