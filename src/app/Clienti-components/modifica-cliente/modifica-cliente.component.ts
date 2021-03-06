import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { en_US, it_IT, NzI18nService } from 'ng-zorro-antd/i18n';
import { ClientiService } from '../../Services/clienti.service';

@Component({
  selector: 'app-modifica-cliente',
  templateUrl: './modifica-cliente.component.html',
  styleUrls: ['./modifica-cliente.component.scss']
})
export class ModificaClienteComponent implements OnInit {

  validateForm!: FormGroup;
  @Input() clienteDettaglio!: any
  comuni: any
  province: any
  //FUNZIONI CHE SETTANO IL NOME COMUNE/PROVINCIA IN BASE ALL'ID SELEZIONATO DAL SELECT
  setNomeComune(value: string): void {
    let find = this.comuni.find((ele: any) => ele.id == value)
    this.validateForm.get('indirizzoSedeOperativa.comune.nome')!.setValue(find.nome);
  }
  setNomeComuneLegale(value: string): void {
    let find = this.comuni.find((ele: any) => ele.id == value)
    this.validateForm.get('indirizzoSedeLegale.comune.nome')!.setValue(find.nome);
  }
  setNomeProvincia(value: string): void {
    let find = this.province.find((ele: any) => ele.id == value)
    this.validateForm.get('indirizzoSedeOperativa.comune.provincia.nome')!.setValue(find.nome);
  }
  setNomeProvinciaLegale(value: string): void {
    let find = this.province.find((ele: any) => ele.id == value)
    this.validateForm.get('indirizzoSedeLegale.comune.provincia.nome')!.setValue(find.nome);
  }
  //SUBMIT
  success:boolean=false;
  error:boolean=false;
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.srv.putCliente(this.validateForm.value, this.clienteDettaglio.id).subscribe(
        ()=>{this.success=true;this.error=false},
        ()=>{this.success=false;this.error=true}
      );
      localStorage.setItem('lastDetailCliente', JSON.stringify(this.validateForm.value))
    } else {
      console.log('invalid submit', this.validateForm.value)
      this.success=false
      this.error=true
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: FormBuilder, private srv: ClientiService, private i18n: NzI18nService,) {
    // COMUNI E PROVINCE DA LOCALSTORAGE
    let jsonComuni = localStorage.getItem('comuni');
    if (jsonComuni) {
      this.comuni = JSON.parse(jsonComuni)
      console.log(this.comuni)
    }
    else { };
    let jsonProvince = localStorage.getItem('province');
    if (jsonProvince) {
      this.province = JSON.parse(jsonProvince)
      console.log(this.province)
    }
    else { };
    this.changeLanguage(en_US)
  }
  //CAMBIO LINGUA PER IL DATEPICKER(NON SUPPORTA IT)
  changeLanguage(value: any): void {
    this.i18n.setLocale(value)
  }
  //ON INIT SETTO I DEFAULT VALUES A QUELLI CORRENTI IN MODO CHE UTENTE POSSA MODIFICARE ANCHE SOLO ALCUNI
  ngOnInit(): void {
    this.validateForm = this.fb.group(
      {
        id: [this.clienteDettaglio.id],
        ragioneSociale: [this.clienteDettaglio.ragioneSociale, [Validators.required]],
        partitaIva: [this.clienteDettaglio.partitaIva, [Validators.required]],
        tipoCliente: [this.clienteDettaglio.tipoCliente, [Validators.required]],
        email: [this.clienteDettaglio.email, [Validators.email, Validators.required]],
        pec: [this.clienteDettaglio.pec, [Validators.email, Validators.required]],
        telefono: [this.clienteDettaglio.telefono, [Validators.required]],
        nomeContatto: [this.clienteDettaglio.nomeContatto, [Validators.required]],
        cognomeContatto: [this.clienteDettaglio.cognomeContatto, [Validators.required]],
        telefonoContatto: [this.clienteDettaglio.telefonoContatto, [Validators.required]],
        emailContatto: [this.clienteDettaglio.emailContatto, [Validators.email, Validators.required]],
        indirizzoSedeOperativa: this.fb.group({
          via: [this.clienteDettaglio.indirizzoSedeOperativa.via, [Validators.required]],
          civico: [this.clienteDettaglio.indirizzoSedeOperativa.civico, [Validators.required]],
          cap: [this.clienteDettaglio.indirizzoSedeOperativa.cap, [Validators.required]],
          localita: [this.clienteDettaglio.indirizzoSedeOperativa.localita, [Validators.required]],
          comune: this.fb.group({
            id: [this.clienteDettaglio.indirizzoSedeOperativa.comune.id, [Validators.required]],
            nome: [this.clienteDettaglio.indirizzoSedeOperativa.comune.nome],
            provincia: this.fb.group({
              id: [this.clienteDettaglio.indirizzoSedeOperativa.comune.provincia.id, [Validators.required]],
              nome: [this.clienteDettaglio.indirizzoSedeOperativa.comune.provincia.nome],
              sigla: [this.clienteDettaglio.indirizzoSedeOperativa.comune.provincia.sigla, [Validators.required]],
            })
          })
        }),
        indirizzoSedeLegale: this.fb.group({
          via: [this.clienteDettaglio.indirizzoSedeLegale.via, [Validators.required]],
          civico: [this.clienteDettaglio.indirizzoSedeLegale.civico, [Validators.required]],
          cap: [this.clienteDettaglio.indirizzoSedeLegale.cap, [Validators.required]],
          localita: [this.clienteDettaglio.indirizzoSedeLegale.localita, [Validators.required]],
          comune: this.fb.group({
            id: [this.clienteDettaglio.indirizzoSedeLegale.comune.id, [Validators.required]],
            nome: [this.clienteDettaglio.indirizzoSedeLegale.comune.nome],
            provincia: this.fb.group({
              id: [this.clienteDettaglio.indirizzoSedeLegale.comune.provincia.id, [Validators.required]],
              nome: [this.clienteDettaglio.indirizzoSedeLegale.comune.provincia.nome],
              sigla: [this.clienteDettaglio.indirizzoSedeLegale.comune.provincia.sigla, [Validators.required]],
            })
          })
        }),
        dataInserimento: [this.clienteDettaglio.dataInserimento],
        dataUltimoContatto: [this.clienteDettaglio.dataUltimoContatto]
      });

  }
  ngOnDestroy(): void {
    this.changeLanguage(it_IT)
  }
}
