import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FatturaForm } from '../interfaces/fattura-form';

@Injectable({
  providedIn: 'root'
})
export class FattureService {

  constructor(private http:HttpClient) { }
  getAllFatture(page:number){
   return this.http.get(`${environment.serverAddress}/api/fatture?page=${page}&size=20&sort=id,ASC`)
  }
  getStatiFattura(){
    return this.http.get(`${environment.serverAddress}/api/statifattura?page=0&size=20&sort=id,ASC`)
  }
  //BY ID CLIENTE, La unpaged mi serve per fare la paginazione client side in modo da
  // 1) risparmire chiamate al server (una ogni volta che cambio pagina!!)
  // 2)snellire il codice per la ricerca fatture (app-cerca fattura)
  getFatturaByRS(idCliente:number){
    return this.http.get(`${environment.serverAddress}/api/fatture/cliente/${idCliente}?page=0&size=2&sort=id,ASC`)
  }
  unpagedFatturaByRS(idCliente:number, size:number){
    return this.http.get(`${environment.serverAddress}/api/fatture/cliente/${idCliente}?size=${size}&sort=id,ASC`)
  }
  //BY ID FATTURA
  getFatturaById(idFat:number){
    return this.http.get(`${environment.serverAddress}/api/fatture/${idFat}`)
  }
//BY STATO
  getFatturaByStato(idStato:number){
    return this.http.get(`${environment.serverAddress}/api/fatture/stato/${idStato}?page=0&size=2&sort=id,ASC`)
  }
  unpagedFatturaByStato(idStato:number, size:number){
    return this.http.get(`${environment.serverAddress}/api/fatture/stato/${idStato}?&size=${size}&sort=id,ASC`)
  }
  //BY ANNO
  getFatturaByAnno(anno:number){
    return this.http.get(`${environment.serverAddress}/api/fatture/anno/?anno=${anno}&page=0&size=2&sort=id,ASC`)
  }
  unpagedFatturaByAnno(anno:number, size:number){
    return this.http.get(`${environment.serverAddress}/api/fatture/anno/?anno=${anno}&size=${size}&sort=id,ASC`)
  }
  // POST E PUT FATTURA
  postNewFattura(fattura:FatturaForm){
    return this.http.post(`${environment.serverAddress}/api/fatture`, fattura)
  }
  putFattura(fattura:FatturaForm, id:number){
    return this.http.put(`${environment.serverAddress}/api/fatture/${id}`, fattura)
  }
  deleteFattura(idFat:number){
    return this.http.delete(`${environment.serverAddress}/api/fatture/${idFat}`)
  }
}
