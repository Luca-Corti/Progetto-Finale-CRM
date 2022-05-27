import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FatturaForm } from '../interfaces/fattura-form';

@Injectable({
  providedIn: 'root'
})
export class FattureService {
  fatturaDettaglio:any
  statiFatture:any
  constructor(private http:HttpClient) { }
  getAllFatture(page:number){
   return this.http.get(`${environment.serverAddress}/api/fatture?page=${page}&size=20&sort=id,ASC`)
  }
  getStatiFattura(){
    return this.http.get(`${environment.serverAddress}/api/statifattura?page=0&size=20&sort=id,ASC`)
  }
  postNewFattura(fattura:FatturaForm){
    return this.http.post(`${environment.serverAddress}/api/fatture`, fattura)
  }
  putFattura(fattura:FatturaForm, id:number){
    return this.http.put(`${environment.serverAddress}/api/fatture/${id}`, fattura)
  }
}
