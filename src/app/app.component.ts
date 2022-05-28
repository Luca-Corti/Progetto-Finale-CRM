import { Component } from '@angular/core';
import { it_IT, NzI18nService } from 'ng-zorro-antd/i18n';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FE0222A-progetto-finale';
  constructor(private i18n: NzI18nService){
    this.i18n.setLocale(it_IT);
  }
  innerWidth!:number
ngOnInit() {
    this.innerWidth = window.innerWidth;
    environment.width= this.innerWidth
    console.log("w", environment.width)
}
}
