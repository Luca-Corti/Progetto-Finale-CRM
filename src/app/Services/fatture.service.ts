import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FatturaForm } from '../interfaces/fattura-form';

@Injectable({
  providedIn: 'root'
})
export class FattureService {
  fatturaDettaglio:any
  statiFatture:any
  constructor(private http:HttpClient) { }
  getAllFatture(page:number){
   return this.http.get(`http://epicode.online/epicodebeservice_v2/api/fatture?page=${page}&size=20&sort=id,ASC`)
  }
  getStatiFattura(){
    return this.http.get('http://epicode.online/epicodebeservice_v2/api/statifattura?page=0&size=20&sort=id,ASC')
  }
  postNewFattura(fattura:FatturaForm){
    return this.http.post('http://epicode.online/epicodebeservice_v2/api/fatture', fattura)
  }
  putFattura(fattura:FatturaForm, id:number){
    return this.http.put('http://epicode.online/epicodebeservice_v2/api/fatture/'+id, fattura)
  }
}
