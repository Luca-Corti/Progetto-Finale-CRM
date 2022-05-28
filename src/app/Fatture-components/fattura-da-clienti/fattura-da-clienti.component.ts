import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { en_US, it_IT, NzI18nService } from 'ng-zorro-antd/i18n';
import { ClientiService } from 'src/app/Services/clienti.service';
import { FattureService } from 'src/app/Services/fatture.service';

@Component({
  selector: 'app-fattura-da-clienti',
  templateUrl: './fattura-da-clienti.component.html',
  styleUrls: ['./fattura-da-clienti.component.scss']
})
export class FatturaDaClientiComponent implements OnInit {
  @Input() clienteDettaglio: any
  @Input() stati: any
  constructor(private fb: FormBuilder, private srv: ClientiService, private fatSrv: FattureService, private i18n: NzI18nService) {
    this.changeLanguage(en_US)
  }
  changeLanguage(value: any): void {
    this.i18n.setLocale(value)
  }
  //SET ID STATO FATTURA IN BASE AL NOME DAL SELECT
  validateForm!: FormGroup;
  setIdStato(value: string): void {
    let find = this.stati.find((ele: any) => ele.nome == value)
    this.validateForm.get('stato.id')!.setValue(find.id);
  }
  //SUBMIT
  success:boolean=false
  error:boolean=false
  submitForm(): void {
    this.validateForm.get('cliente')!.setValue(this.clienteDettaglio);
    this.validateForm.get('data')!.setValue(this.validateForm.value.data.toISOString());
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.fatSrv.postNewFattura(this.validateForm.value).subscribe(
        ()=>{this.success=true;this.error=false},
        ()=>{this.success=false;this.error=true}
      );
    } else {
      console.log('invalid submit', this.validateForm.value)
      this.success=false;this.error=true;
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  //ONINIT
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      data: ["", [Validators.required]],
      numero: [null, [Validators.required]],
      anno: [null, [Validators.required]],
      importo: [null, [Validators.required]],
      cliente: ["", [Validators.required]],
      stato: this.fb.group({
        id: ["", [Validators.required]],
        nome: ["", [Validators.required]],
      })
    })
  }
  ngOnDestroy(): void {
    this.changeLanguage(it_IT)
  }

}
