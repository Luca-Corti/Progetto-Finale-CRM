import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FattureService } from 'src/app/Services/fatture.service';

@Component({
  selector: 'app-modifica-fattura',
  templateUrl: './modifica-fattura.component.html',
  styleUrls: ['./modifica-fattura.component.scss']
})
export class ModificaFatturaComponent implements OnInit {
 @Input() fatturaDettaglio:any
  stati:any

  constructor(private fatSrv:FattureService, private fb: FormBuilder) { }
  validateForm!: FormGroup;

setIdStato(value: string): void {
  let find = this.stati.find((ele: any) => ele.nome == value)
  this.validateForm.get('stato.id')!.setValue(find.id);
}
submitForm(): void {
  if (this.validateForm.valid) {
    console.log('submit', this.validateForm.value);
    this.fatSrv.putFattura(this.validateForm.value, this.fatturaDettaglio.id).subscribe();
    localStorage.setItem('LastDetailFattura', JSON.stringify(this.validateForm.value))

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
    let json= localStorage.getItem('statiFattura')
    if(json){this.stati=JSON.parse(json)}
    else{return}

    this.validateForm = this.fb.group({
      id:[this.fatturaDettaglio.id],
      data:[this.fatturaDettaglio.data, [Validators.required]],
      numero: [this.fatturaDettaglio.numero, [Validators.required]],
      anno:[this.fatturaDettaglio.anno, [Validators.required]],
      importo:[this.fatturaDettaglio.importo, [Validators.required]],
      cliente:[this.fatturaDettaglio.cliente, [Validators.required]],
      stato: this.fb.group({
        id:[this.fatturaDettaglio.stato.id, [Validators.required]],
        nome:[this.fatturaDettaglio.stato.nome, [Validators.required]],
      })
    })
  }
}
