import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  nomeAccount = this.authSrv.user.username
  constructor(private authSrv: AuthService) { }
  status = {
    name: 'Online',
    color: 'green'
  }
  width = environment.width
  //BADGE STATO ACCOUNT
  changeStatus(value: string) {
    if (value == 'Online') { this.status.name = 'Online'; this.status.color = 'green' }
    else if (value == 'Offline') { this.status.name = 'Offline'; this.status.color = 'red' }
    else if (value == 'ND') { this.status.name = 'Non disponibile'; this.status.color = 'gold' }
    else if (value == 'Invisibile') { this.status.name = 'Invisibile'; this.status.color = '' }
  }
  logout() {
    this.authSrv.logout()
  }
  ngOnInit(): void {
  }
}
