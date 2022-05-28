
import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/authentication/auth.service';
import { FattureService } from 'src/app/Services/fatture.service';
import { ClientiService } from '../../Services/clienti.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-dettaglio-cliente',
  templateUrl: './dettaglio-cliente.component.html',
  styleUrls: ['./dettaglio-cliente.component.scss']
})
export class DettaglioClienteComponent implements OnInit, OnDestroy {
  clienteDettaglio:any=this.srv.clienteDettaglio
  nomeAccount=this.authSrv.user.username
  constructor(private srv:ClientiService,private fatSrv:FattureService, private router:Router, private modal: NzModalService, private authSrv:AuthService) {
    if(this.clienteDettaglio==null){
      this.errors=true;
    }
   }
   width=environment.width
   modalWidth='60vw'
   errors:boolean=false
  onBack(){
    this.router.navigate(['/clienti'])
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
  cancelled:boolean=false
  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Sei sicuro di voler cancellare questo cliente?',
      nzContent: '<b style="color: red;">Con esso verranno cancellate anche le rispettive fatture</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {this.deleteCliente(this.clienteDettaglio.id);this.cancelled=true},
      nzCancelText: 'No',
      nzOnCancel: () => {}
    });
  }
  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 1000);
    this.router.navigate(['/clienti'])
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  //MODALE NUOVA FATTURA
  fatVisible = false
  nuovaFattura(){
    this.fatVisible = true
  }
  handleOkFat(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.fatVisible = false;
      this.isOkLoading = false;
    }, 1000);
  }
  handleCancelFat(): void {
    this.fatVisible = false;
  }
  deleteCliente(id:number){
    this.srv.deleteCliente(id).subscribe()
  }
  stati:any

  getStatiFattura(){
    this.fatSrv.getStatiFattura().subscribe((data)=>{
      this.stati=data
      this.stati=this.stati.content
      this.fatSrv.statiFatture = this.stati
    })
  }
  logout(){
    this.authSrv.logout()
  }
  ngOnInit(): void {
    this.getStatiFattura()
    if(this.width<400){this.modalWidth='100vw'}
  }
  ngOnDestroy(): void {
    this.srv.clienteDettaglio = { }

  }

}
