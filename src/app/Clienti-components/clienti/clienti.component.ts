import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../../interfaces/cliente';
import { ClientiService } from '../../Services/clienti.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent implements OnInit {
  dati: any;
  datiComune: any
  datiProvincia: any
  clienti!: Cliente[]
  comuni!: any
  province!: any
  page: number = 1;
  totalElements!: number
  width = environment.width
  modalWidth = '60vw'

  // COLONNE CHE ORDINANO I DATI DELLA PAGINA, IN BASE A ID E FATTURATO
  colonnaId =
    {
      title: 'Id cliente',
      compare: (a: any, b: any) => a.id - b.id,
      priority: 1
    };
  colonnaFatturato =
    {
      title: 'Fatturato annuale',
      compare: (a: any, b: any) => {
        if (a.fatturatoAnnuale && b.fatturatoAnnuale) { return a.fatturatoAnnuale - b.fatturatoAnnuale }
        else { return 1 }
      },
      priority: 4
    };

  constructor(private srv: ClientiService, private router: Router) { }
  loading:boolean=false
  getAllClients(page: number) {
    this.loading=true
    this.srv.getAllClients(page - 1).subscribe((data) => {
      this.dati = data
      this.totalElements = this.dati.totalElements
      this.clienti = this.dati.content
      this.loading=false
    })
  }
  getAllComuni() {
    this.srv.getComuni().subscribe((data) => {
      this.datiComune = data
      this.comuni = this.datiComune.content
    })
  }
  getAllProvince() {
    this.srv.getProvince().subscribe((data) => {
      this.datiProvincia = data
      this.province = this.datiProvincia.content
    })
  }
  //VARIABILE E FUNZIONE CHE MI MANDA NEL DETTAGLIO CLIENTE
  clienteDettaglio!: any
  dettaglioCliente(dati: any): void {
    //---------------BUG FIX DOVUTO A MANCANZA DATI NEL SERVER---------------------
    this.clienteDettaglio = dati
    if (this.clienteDettaglio.indirizzoSedeLegale == null) {
      this.clienteDettaglio.indirizzoSedeLegale = {
        id: "",
        via: "",
        civico: "",
        cap: "",
        localita: "",
        comune: {
          id: "",
          nome: "",
          provincia: {
            id: "",
            nome: "",
            sigla: ""
          }
        }
      }
    }
    if (this.clienteDettaglio.indirizzoSedeOperativa == null) {
      this.clienteDettaglio.indirizzoSedeOperativa = {
        id: "",
        via: "",
        civico: "",
        cap: "",
        localita: "",
        comune: {
          id: "",
          nome: "",
          provincia: {
            id: "",
            nome: "",
            sigla: ""
          }
        }
      }
    }
    if (this.clienteDettaglio.fatturatoAnnuale == null) {
      this.clienteDettaglio.fatturatoAnnuale = ""
    }
    if (this.clienteDettaglio.dataInserimento == null) {
      this.clienteDettaglio.dataInserimento = ""
    }
    if (this.clienteDettaglio.dataUltimoContatto == null) {
      this.clienteDettaglio.dataUltimoContatto = ""
    }
    //-----------------FINE BUGFIX-------------------------------------------------
    localStorage.setItem('lastDetailCliente', JSON.stringify(this.clienteDettaglio))
    localStorage.setItem('comuni', JSON.stringify(this.comuni))
    localStorage.setItem('province', JSON.stringify(this.province))
    this.router.navigate(['/clienti', dati.id])
  }
  //VARIABILI PER MODALS
  isVisible = false;
  isOkLoading = false;
  //MODALE NUOVO CLIENTE
  nuovoModal(): void {
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
  //MODALE CERCA CLIENTE
  cercaVisible = false
  cercaModal(): void {
    this.cercaVisible = true;
  }
  handleOkCerca(): void {
    this.cercaVisible = false;
  }
  handleCancelCerca(): void {
    this.cercaVisible = false;
  }

  //ON INIT
  ngOnInit(): void {
    this.getAllClients(this.page - 1)
    this.getAllComuni()
    this.getAllProvince()
    if (this.width < 400) { this.modalWidth = '100vw' }

  }

}
