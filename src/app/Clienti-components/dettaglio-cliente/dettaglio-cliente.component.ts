
import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ClientiService } from '../../Services/clienti.service';

@Component({
  selector: 'app-dettaglio-cliente',
  templateUrl: './dettaglio-cliente.component.html',
  styleUrls: ['./dettaglio-cliente.component.scss']
})
export class DettaglioClienteComponent implements OnInit, OnDestroy {
  clienteDettaglio:any=this.srv.clienteDettaglio

  constructor(private srv:ClientiService, private router:Router, private modal: NzModalService) {console.log(this.clienteDettaglio) }
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
      nzOnOk: () => this.deleteCliente(this.clienteDettaglio.id),
      nzCancelText: 'No',
      nzOnCancel: () => this.cancelled=true
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
  deleteCliente(id:number){
    this.srv.deleteCliente(id).subscribe()
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.srv.clienteDettaglio = { }

  }

}
