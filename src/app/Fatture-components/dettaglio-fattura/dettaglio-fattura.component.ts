import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FattureService } from 'src/app/Services/fatture.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dettaglio-fattura',
  templateUrl: './dettaglio-fattura.component.html',
  styleUrls: ['./dettaglio-fattura.component.scss']
})
export class DettaglioFatturaComponent implements OnInit {

  fatturaDettaglio: any
  width = environment.width
  modalWidth = '60vw'
  errors: boolean = false
  idRotta: number | string;

  constructor(private router: Router, private fatSrv: FattureService, private modal: NzModalService, private rotta: ActivatedRoute) {
    this.idRotta = this.rotta.snapshot.params['id']
  }

  onBack() {
    this.router.navigate(['/fatture'])
  }

  isVisible = false;
  isOkLoading = false;
  //MODALE
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
  //MODALE CANCELLA FATTURA
  cancelled: boolean = false
  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Sei sicuro di voler cancellare questa fattura?',
      nzContent: '<b style="color: red;">Questa azione è potenzialmente illegale, assicurati di avere un buon avvocato</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deleteFattura(this.fatturaDettaglio.id);
        this.cancelled = true;
        localStorage.removeItem('LastDetailFattura')
      },
      nzCancelText: 'No',
      nzOnCancel: () => { }
    });
  }
  deleteFattura(id: number) {
    this.fatSrv.deleteFattura(id).subscribe()
  }

  //ONINIT RECUPERO DATI DA LOCALSTORAGE E VERIFICO CHE UTENTE VENGA DALLA GIUSTA ROTTA
  ngOnInit(): void {
    let json = localStorage.getItem('LastDetailFattura')
    if (json) {
      this.fatturaDettaglio = JSON.parse(json);
      if (this.idRotta == this.fatturaDettaglio.id) {
        return
      }
      else {
        this.router.navigate(['/fatture'])
      }
    }
    else { this.errors = true }

    if (this.width < 400) { this.modalWidth = '100vw' }
  }


}
