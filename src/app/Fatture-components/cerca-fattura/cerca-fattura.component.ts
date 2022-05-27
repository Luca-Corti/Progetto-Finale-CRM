import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FattureService } from 'src/app/Services/fatture.service';

@Component({
  selector: 'app-cerca-fattura',
  templateUrl: './cerca-fattura.component.html',
  styleUrls: ['./cerca-fattura.component.scss']
})
export class CercaFatturaComponent implements OnInit {

  byId:boolean=false;
  byRagioneSociale:boolean=false;
  byStato:boolean=false;
  byAnno:boolean=false;
  searchForm!:FormGroup;
  risultato:any
  totalElements:any= 2
  metadati:any
  loading:boolean=false;
  @Input() stati:any

  changeSearch(ricerca:string){
    if(ricerca==='byId'){
      this.byId=true;
      this.byRagioneSociale=false;this.byStato=false;this.byAnno=false;
    }
    else if(ricerca==='byRagioneSociale'){
      this.byRagioneSociale=true;
       this.byId=false;this.byStato=false;this.byAnno=false;
      }
    else if(ricerca==='byStato'){
      this.byStato=true;
      this.byId=false;this.byRagioneSociale=false;this.byAnno=false;
    }
    else if(ricerca==='byAnno'){
      this.byAnno=true
      this.byId=false;this.byRagioneSociale=false;this.byStato=false;
    }
    else{ this.byId=false; this.byRagioneSociale=false; this.byStato=false; this.byAnno=false}
    }
    submitSearch(){
      console.log(this.searchForm.value)
      if(this.searchForm.value.ricerca==='byId'){this.getFatturaById(this.searchForm.value.value)}
      else if(this.searchForm.value.ricerca==='byRagioneSociale'){this.getFatturaByRagioneSociale(this.searchForm.value.value)}
      else if(this.searchForm.value.ricerca==='byStato'){this.getFatturaByStato(this.searchForm.value.value)}
      else if(this.searchForm.value.ricerca==='byAnno'){this.getFatturaByAnno(this.searchForm.value.value)}
      else{ console.log("else")}
    }
    getFatturaById(id:number){
      this.loading=true
      this.fatSrv.getFatturaById(id).subscribe(data=>{
        this.risultato= []
        this.risultato.push(data)
        this.loading= false
      })
    }

    getFatturaByRagioneSociale(idcliente:number){
      this.loading=true
      this.fatSrv.getFatturaByRS(idcliente).subscribe(data=>{
        this.metadati=data
        this.totalElements= this.metadati.totalElements
        this.fatSrv.unpagedFatturaByRS(idcliente, this.totalElements).subscribe(val=>{
          this.risultato=val
          this.risultato=this.risultato.content
          this.loading= false
        })
      })
    }
    getFatturaByStato(idStato:number){
      this.loading=true
      this.fatSrv.getFatturaByStato(idStato).subscribe(data=>{
        this.metadati=data
        this.totalElements= this.metadati.totalElements
        this.fatSrv.unpagedFatturaByStato(idStato, this.totalElements).subscribe(val=>{
          this.risultato=val
          this.risultato=this.risultato.content
          this.loading= false
        })
      })
    }
    getFatturaByAnno(anno:number){
      this.loading=true
      this.fatSrv.getFatturaByAnno(anno).subscribe(data=>{
        this.metadati=data
        this.totalElements= this.metadati.totalElements
        this.fatSrv.unpagedFatturaByAnno(anno,this.totalElements).subscribe(val=>{
          this.risultato=val
          this.risultato=this.risultato.content
          this.loading= false
        })

      })
    }
    dettaglioFattura(dati:any):void {
      console.log(dati)
       this.fatSrv.fatturaDettaglio = dati
      this.router.navigate(['/fatture', dati.id])
    }
  constructor(private fb: FormBuilder, private fatSrv:FattureService, private router:Router) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      ricerca:[null, [Validators.required]],
      value: [null, [Validators.required]],
    });
  }

}
