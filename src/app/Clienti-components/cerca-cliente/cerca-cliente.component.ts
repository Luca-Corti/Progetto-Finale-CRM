import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientiService } from 'src/app/Services/clienti.service';

@Component({
  selector: 'app-cerca-cliente',
  templateUrl: './cerca-cliente.component.html',
  styleUrls: ['./cerca-cliente.component.scss']
})
export class CercaClienteComponent implements OnInit {
  byId: boolean = false;
  byRagioneSociale: boolean = false;
  searchForm!: FormGroup;
  risultato: any;
  clienteDettaglio: any
  //CAMBIA METODO DI RICERCA
  changeSearch(ricerca: string) {
    if (ricerca === 'byId') { this.byId = true; this.byRagioneSociale = false }
    else if (ricerca === 'byRagioneSociale') { this.byRagioneSociale = true; this.byId = false }
    else { this.byId = false; this.byRagioneSociale = false }
  }
  //SUBMIT RICERCA
  submitSearch() {
    console.log(this.searchForm.value)
    if (this.searchForm.value.ricerca === 'byId') { this.getClienteById(this.searchForm.value.value) }
    else if (this.searchForm.value.ricerca === 'byRagioneSociale') { this.getClienteByRagioneSociale(this.searchForm.value.value) }
    else { console.log("else") }
  }
  getClienteById(id: number) {
    this.srv.getClienteById(id).subscribe(data => {
      this.risultato = []
      this.risultato.push(data)
    })
  }
  getClienteByRagioneSociale(query: string) {
    this.srv.getClienteByRS(query).subscribe(data => {
      this.risultato = data
      this.risultato = this.risultato.content
    })
  }
  //MOSTRA PAGINA DETTAGLIO CLIENTE
  dettaglioCliente(dati: any): void {
    //--------------BUG FIX DOVUTO A MANCANZA DATI NEL SERVER--------------------------
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
    //------------------FINE BUGFIX----------------------------------------------
    localStorage.setItem('lastDetailCliente', JSON.stringify(this.clienteDettaglio))
    this.router.navigate(['/clienti', dati.id])
  }

  constructor(private fb: FormBuilder, private srv: ClientiService, private router: Router) { }
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      ricerca: [null, [Validators.required]],
      value: [null, [Validators.required]],
    });
  }

}
