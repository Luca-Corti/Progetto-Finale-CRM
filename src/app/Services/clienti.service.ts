import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../interfaces/cliente';
import { ClienteForm } from '../interfaces/cliente-form';

@Injectable({
  providedIn: 'root'
})
export class ClientiService {
  constructor(private http:HttpClient) { }


  getAllClients(page:number){
   return this.http.get(`${environment.serverAddress}/api/clienti?page=${page}&size=20&sort=id,ASC`)
  }
  getClienteById(id:number){
    return this.http.get(`${environment.serverAddress}/api/clienti/${id}`)
  }
  getClienteByRS(query:string){
    return this.http.get(`${environment.serverAddress}/api/clienti/ragionesociale?nome=${query}`)
  }
  postNewClient(formData:ClienteForm){
    return this.http.post(`${environment.serverAddress}/api/clienti`, formData)
  }
  putCliente(formData:Cliente, id:number){
    return this.http.put(`${environment.serverAddress}/api/clienti/${id}`, formData)
  }
  deleteCliente(id:number){
    return this.http.delete(`${environment.serverAddress}/api/clienti/${id}`)
  }
  getComuni(){
    return this.http.get(`${environment.serverAddress}/api/comuni?page=0&size=20&sort=id,ASC`)
  }
  getProvince(){
    return this.http.get(`${environment.serverAddress}/api/province?page=0&size=20&sort=id,ASC`)
  }

}
