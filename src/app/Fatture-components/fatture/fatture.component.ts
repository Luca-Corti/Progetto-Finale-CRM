import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fattura } from '../../interfaces/fattura';
import { FattureService } from '../../Services/fatture.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss']
})
export class FattureComponent implements OnInit {
  dati: any;
  fatture!: Fattura[]
  page: number = 1;
  totalElements!: number
  stati: any
  width = environment.width
  modalWidth = '60vw'
  //Colonne per ordinare id, numero e importo fattura
  colonnaId =
    {
      title: 'Id cliente',
      compare: (a: any, b: any) => a.id - b.id,
      priority: 1
    };
  colonnaImporto =
    {
      title: 'Importo',
      compare: (a: any, b: any) => {
        if (a.importo && b.importo) { return a.importo - b.importo }
        else { return 1 }
      },
      priority: 4
    };
  colonnaNumero =
    {
      title: 'Numero',
      compare: (a: any, b: any) => {
        if (a.numero && b.numero) { return a.numero - b.numero }
        else { return 1 }
      },
      priority: 3
    };
  constructor(private fatSrv: FattureService, private router: Router) { }

  //MODALE
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
  //MODALE CERCA FATTURA
  cercaVisible = false
  handleCancelCerca(): void {
    this.cercaVisible = false;
  }
  cercaModal(): void {
    this.cercaVisible = true;
  }

  handleOkCerca(): void {
    this.cercaVisible = false;
  }
  //DETTAGLIO FATTURA
  fatturaDettaglio: any
  dettaglioFattura(dati: any): void {
    this.fatturaDettaglio = dati
    localStorage.setItem('LastDetailFattura', JSON.stringify(this.fatturaDettaglio))
    this.router.navigate(['/fatture', dati.id])
  }
  loading:boolean=false
  getAllFatture(page: number) {
    this.loading=true
    this.fatSrv.getAllFatture(page - 1).subscribe((data) => {
      this.dati = data
      this.totalElements = this.dati.totalElements
      this.fatture = this.dati.content
      this.loading=false
    })
  }
  getStatiFattura() {
    this.fatSrv.getStatiFattura().subscribe((data) => {
      this.stati = data
      this.stati = this.stati.content
      localStorage.setItem('statiFattura', JSON.stringify(this.stati))
    })
  }
  ngOnInit(): void {
    this.getAllFatture(this.page - 1);
    this.getStatiFattura()
    if (this.width < 400) { this.modalWidth = '100vw' }
  }

}
