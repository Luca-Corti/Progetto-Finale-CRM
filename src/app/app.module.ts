import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route,Router,RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UtentiComponent } from './utenti/utenti.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuardGuard } from './authentication/auth-guard.guard';
import { ClientiComponent } from './Clienti-components/clienti/clienti.component';
import { TokenInterceptor } from './authentication/token.interceptor';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzResultModule } from 'ng-zorro-antd/result';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';

// Import icons
import { UserOutline, FileSearchOutline, TeamOutline, UserAddOutline, LoginOutline, ArrowLeftOutline, LockOutline, MailOutline} from '@ant-design/icons-angular/icons';
import { FattureComponent } from './Fatture-components/fatture/fatture.component';

const icons: IconDefinition[] = [ UserOutline, TeamOutline, FileSearchOutline, UserAddOutline, LoginOutline, ArrowLeftOutline, LockOutline, MailOutline];

import { NZ_I18N, it_IT } from 'ng-zorro-antd/i18n';
import { NuovoClienteComponent } from './Clienti-components/nuovo-cliente/nuovo-cliente.component';
import { NuovaFatturaComponent } from './Fatture-components/nuova-fattura/nuova-fattura.component';
import { DettaglioClienteComponent } from './Clienti-components/dettaglio-cliente/dettaglio-cliente.component';
import { DettaglioFatturaComponent } from './Fatture-components/dettaglio-fattura/dettaglio-fattura.component';
import { ModificaClienteComponent } from './Clienti-components/modifica-cliente/modifica-cliente.component';
import { ModificaFatturaComponent } from './Fatture-components/modifica-fattura/modifica-fattura.component';


const customLanguagePack = {
  it_IT,
  ...{
    Pagination: {
      items_per_page: "per pagina"
    }
  }
}


const routes:Route[] = [
  {
    path:"",
    component:LandingPageComponent
  },
  {
    path:"home",
    component:HomepageComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"clienti",
    component:ClientiComponent,
  },
  {
    path:"clienti/:id",
    component:DettaglioClienteComponent,
  },
  {
    path:"fatture",
    component:FattureComponent,
  },
  {
    path:"fatture/:id",
    component:DettaglioFatturaComponent,
  },
  {
    path:"utenti",
    component:UtentiComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UtentiComponent,
    HomepageComponent,
    LandingPageComponent,
    ClientiComponent,
    FattureComponent,
    NuovoClienteComponent,
    NuovaFatturaComponent,
    DettaglioClienteComponent,
    DettaglioFatturaComponent,
    ModificaClienteComponent,
    ModificaFatturaComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NzLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzBreadCrumbModule,
    NzAlertModule,
    NzMenuModule,
    NzIconModule.forRoot(icons),
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    NzCheckboxModule,
    NzTableModule,
    NzPaginationModule,
    NzDropDownModule,
    NzAvatarModule,
    NzPageHeaderModule,
    NzTagModule,
    NzStatisticModule,
    NzModalModule,
    NzSelectModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzSliderModule,
    NzToolTipModule,
    NzDescriptionsModule,
    NzResultModule

  ],
  providers: [
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  },
  { provide: NZ_I18N, useValue: customLanguagePack }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
