import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { en_US, it_IT, NzI18nService } from 'ng-zorro-antd/i18n';
import { ClientiService } from '../../Services/clienti.service';

@Component({
  selector: 'app-nuovo-cliente',
  templateUrl: './nuovo-cliente.component.html',
  styleUrls: ['./nuovo-cliente.component.scss']
})
export class NuovoClienteComponent implements OnInit, OnDestroy {

  validateForm!: FormGroup;
  @Input() comuni!: any
  @Input() province!: any
  //SET DEI NOMI COMUNE/PROVINCIA IN BASE AD ID DAL SELECT
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
  success:boolean=false
  error:boolean=false
  submitForm(): void {
    this.validateForm.value.dataUltimoContatto = this.validateForm.value.dataUltimoContatto.toISOString()
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.srv.postNewClient(this.validateForm.value).subscribe(
      ()=>{this.success=true;this.error=false},
      ()=>{this.success=false;this.error=true}
      );
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

  constructor(private fb: FormBuilder, private srv: ClientiService, private i18n: NzI18nService) {
    this.changeLanguage(en_US)
  }
  changeLanguage(value: any): void {
    this.i18n.setLocale(value)
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group(
      {
        ragioneSociale: [null, [Validators.required]],
        partitaIva: [null, [Validators.required]],
        tipoCliente: [null, [Validators.required]],
        email: [null, [Validators.email, Validators.required]],
        pec: [null, [Validators.email, Validators.required]],
        telefono: [null, [Validators.required]],
        nomeContatto: [null, [Validators.required]],
        cognomeContatto: [null, [Validators.required]],
        telefonoContatto: [null, [Validators.required]],
        emailContatto: [null, [Validators.email, Validators.required]],
        indirizzoSedeOperativa: this.fb.group({
          via: [null, [Validators.required]],
          civico: [null, [Validators.required]],
          cap: [null, [Validators.required]],
          localita: [null, [Validators.required]],
          comune: this.fb.group({
            id: [null, [Validators.required]],
            nome: [""],
            provincia: this.fb.group({
              id: [null, [Validators.required]],
              nome: [""],
              sigla: [null, [Validators.required]],
            })
          })
        }),
        indirizzoSedeLegale: this.fb.group({
          via: [null, [Validators.required]],
          civico: [null, [Validators.required]],
          cap: [null, [Validators.required]],
          localita: [null, [Validators.required]],
          comune: this.fb.group({
            id: [null, [Validators.required]],
            nome: [""],
            provincia: this.fb.group({
              id: [null, [Validators.required]],
              nome: [""],
              sigla: [null, [Validators.required]],
            })
          })
        }),
        dataInserimento: [new Date().toISOString()],
        dataUltimoContatto: [""]
      });
  }
  ngOnDestroy(): void {
    this.changeLanguage(it_IT)
  }
}
