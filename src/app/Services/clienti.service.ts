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
   return this.http.get(`http://epicode.online/epicodebeservice_v2/api/clienti?page=${page}&size=20&sort=id,ASC`)
  }
  getClienteById(id:number){
    return this.http.get("http://epicode.online/epicodebeservice_v2/api/clienti/"+id)
  }
  getClienteByRS(query:string){
    return this.http.get("http://epicode.online/epicodebeservice_v2/api/clienti/ragionesociale?nome="+query)
  }
  postNewClient(formData:ClienteForm){
    return this.http.post("http://epicode.online/epicodebeservice_v2/api/clienti", formData)
  }
  putCliente(formData:Cliente, id:number){
    return this.http.put("http://epicode.online/epicodebeservice_v2/api/clienti/"+id , formData)
  }
  deleteCliente(id:number){
    return this.http.delete("http://epicode.online/epicodebeservice_v2/api/clienti/"+id)
  }
  getComuni(){
    return this.http.get("http://epicode.online/epicodebeservice_v2/api/comuni?page=0&size=20&sort=id,ASC")
  }
  getProvince(){
    return this.http.get("http://epicode.online/epicodebeservice_v2/api/province?page=0&size=20&sort=id,ASC")
  }

 clienteDettaglio = { }
 province:any
 comuni:any

}
