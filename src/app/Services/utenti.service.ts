import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {


  constructor(private http:HttpClient) { }
  getAllUsers(page:number){
   return this.http.get(`${environment.serverAddress}/api/users?page=${page}&size=20&sort=id,ASC`)
  }

}
