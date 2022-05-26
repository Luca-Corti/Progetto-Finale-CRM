import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {


  constructor(private http:HttpClient) { }
  getAllUsers(page:number){
   return this.http.get(`http://epicode.online/epicodebeservice_v2/api/users`)
  }

}
