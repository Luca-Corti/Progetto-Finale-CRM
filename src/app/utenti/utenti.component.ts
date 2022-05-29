import { Component, OnInit } from '@angular/core';
import { UtentiService } from '../Services/utenti.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-utenti',
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.scss']
})
export class UtentiComponent implements OnInit {
  dati: any;
  utenti!: any
  page: number = 1;
  totalElements!: number
  width = environment.width
  constructor(private srv: UtentiService) { }

  getAllUsers(page: number) {
    this.srv.getAllUsers(page - 1).subscribe((data) => {
      this.dati = data
      this.totalElements = this.dati.totalElements
      this.utenti = this.dati.content
    })
  }

  ngOnInit(): void {
    this.getAllUsers(this.page - 1)

  }

}
