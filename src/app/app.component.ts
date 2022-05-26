import { Component } from '@angular/core';
import { it_IT, NzI18nService } from 'ng-zorro-antd/i18n';

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
}
