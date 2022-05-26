import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../interfaces/cliente';
import { ClientiService } from '../../Services/clienti.service';
import { FattureService } from '../../Services/fatture.service';
import { en_US, it_IT, NzI18nService } from 'ng-zorro-antd/i18n';

@Component({
  selector: 'app-nuova-fattura',
  templateUrl: './nuova-fattura.component.html',
  styleUrls: ['./nuova-fattura.component.scss']
})
export class NuovaFatturaComponent implements OnInit,OnDestroy {
byId:boolean=false;
byRagioneSociale:boolean=false;
searchForm!:FormGroup;
risultato:any=false;
cliente!:Cliente;
fineRicerca:boolean=false;
value1 = 1970;

validateForm!: FormGroup;
@Input() stati!:any

  constructor(private fb: FormBuilder, private srv: ClientiService, private fatSrv:FattureService,private i18n: NzI18nService) {
    this.changeLanguage(en_US)
   }
   changeLanguage(value: any): void {
    this.i18n.setLocale(value)
  }
changeSearch(ricerca:string){
if(ricerca==='byId'){this.byId=true; this.byRagioneSociale=false}
else if(ricerca==='byRagioneSociale'){this.byRagioneSociale=true; this.byId=false}
else{ this.byId=false; this.byRagioneSociale=false}
}
submitSearch(){
  console.log(this.searchForm.value)
  if(this.searchForm.value.ricerca==='byId'){this.getClienteById(this.searchForm.value.value)}
  else if(this.searchForm.value.ricerca==='byRagioneSociale'){this.getClienteByRagioneSociale(this.searchForm.value.value)}
  else{ return}
}
getClienteById(id:number){
  this.srv.getClienteById(id).subscribe(data=>{
    this.risultato= []
    this.risultato.push(data)
  })
}
getClienteByRagioneSociale(query:string){
  this.srv.getClienteByRS(query).subscribe(data=>{
    this.risultato=data
    this.risultato=this.risultato.content
  })
}
log(){
  console.log(this.risultato);
  console.log(this.cliente)
}
select(cliente:Cliente){
  this.cliente = cliente;
  this.fineRicerca=true
}
setIdStato(value: string): void {
  let find = this.stati.find((ele: any) => ele.nome == value)
  this.validateForm.get('stato.id')!.setValue(find.id);
}
submitForm(): void {
  this.validateForm.get('cliente')!.setValue(this.cliente);
  this.validateForm.get('data')!.setValue(this.validateForm.value.data.toISOString());
  if (this.validateForm.valid) {
    console.log('submit', this.validateForm.value);
    this.fatSrv.postNewFattura(this.validateForm.value).subscribe();
  } else {
    console.log('invalid submit', this.validateForm.value)
    Object.values(this.validateForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }
}
  ngOnInit(): void {
    this.searchForm = this.fb.group({
      ricerca:[null, [Validators.required]],
      value: [null, [Validators.required]],
    });
    this.validateForm = this.fb.group({
      data:["", [Validators.required]],
      numero: [null, [Validators.required]],
      anno:[null, [Validators.required]],
      importo:[null, [Validators.required]],
      cliente:["", [Validators.required]],
      stato: this.fb.group({
        id:["", [Validators.required]],
        nome:["", [Validators.required]],
      })
    })
  }
  ngOnDestroy(): void {
    this.changeLanguage(it_IT)
  }
}
