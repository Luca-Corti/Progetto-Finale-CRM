import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class DettaglioClienteComponent implements OnInit {

  constructor(private srv: ClientiService, private fatSrv: FattureService, private router: Router, private rotta: ActivatedRoute, private modal: NzModalService, private authSrv: AuthService) {
    this.idRotta = this.rotta.snapshot.params['id']
  }

  idRotta: number | string
  width = environment.width
  modalWidth = '60vw'
  errors: boolean = false
  clienteDettaglio: any
  nomeAccount = this.authSrv.user.username
  onBack() {
    this.router.navigate(['/clienti'])
  }
  status = {
    name: 'Online',
    color: 'green'
  }
  changeStatus(value: string) {
    if (value == 'Online') { this.status.name = 'Online'; this.status.color = 'green' }
    else if (value == 'Offline') { this.status.name = 'Offline'; this.status.color = 'red' }
    else if (value == 'ND') { this.status.name = 'Non disponibile'; this.status.color = 'gold' }
    else if (value == 'Invisibile') { this.status.name = 'Invisibile'; this.status.color = '' }
  }
  logout() {
    this.authSrv.logout()
  }
  //MODALE MODIFICA
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
  //MODALE CANCELLA UTENTE
  cancelled: boolean = false
  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Sei sicuro di voler cancellare questo cliente?',
      nzContent: '<b style="color: red;">Con esso verranno cancellate anche le rispettive fatture</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteCliente(this.clienteDettaglio.id);
        this.cancelled = true
        localStorage.removeItem('lastDetailCliente')
      },
      nzCancelText: 'No',
      nzOnCancel: () => { }
    });
  }

  //MODALE NUOVA FATTURA
  fatVisible = false
  nuovaFattura() {
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
  //CHIAMATE SERVICE
  deleteCliente(id: number) {
    this.srv.deleteCliente(id).subscribe()
  }
  stati: any
  getStatiFattura() {
    this.fatSrv.getStatiFattura().subscribe((data) => {
      this.stati = data
      this.stati = this.stati.content
      localStorage.setItem('statiFattura', JSON.stringify(this.stati))
    })
  }
  //FATTURE DELLO SPECIFICO CLIENTE PAGINATE LATO CLIENT
  loading: boolean = false
  metadati: any
  totalElements: any
  risultato: any
  mostraFatture() {
    this.getFatturaByRagioneSociale(this.clienteDettaglio.id)
  }
  getFatturaByRagioneSociale(idcliente: number) {
    this.loading = true
    this.fatSrv.getFatturaByRS(idcliente).subscribe(data => {
      this.metadati = data
      this.totalElements = this.metadati.totalElements
      this.fatSrv.unpagedFatturaByRS(idcliente, this.totalElements).subscribe(val => {
        this.risultato = val
        this.risultato = this.risultato.content
        this.loading = false
      })
    })
  }
  dettaglioFattura(dati: any): void {
    localStorage.setItem('LastDetailFattura', JSON.stringify(dati))
    this.router.navigate(['/fatture', dati.id])
  }

  //ON INIT
  ngOnInit(): void {
    this.getStatiFattura()
    let json = localStorage.getItem('lastDetailCliente')
    if (json) { this.clienteDettaglio = JSON.parse(json) }
    else { this.errors = true }

    if (this.idRotta == this.clienteDettaglio.id) {
      return
    }
    else {
      this.router.navigate(['/clienti'])
    }
    if (this.width < 400) { this.modalWidth = '100vw' }
  }
}
