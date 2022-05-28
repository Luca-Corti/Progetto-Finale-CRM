import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route,RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardGuard } from './authentication/auth-guard.guard';
import { LoginGuardGuard } from './authentication/login-guard.guard';
import { AdminGuard } from './authentication/admin.guard';
import { TokenInterceptor } from './authentication/token.interceptor';
//import ng zorro
import { NgZorroModule } from './ng-zorro/ng-zorro.module';
// Import icons
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserOutline, FileSearchOutline, TeamOutline, UserAddOutline, LoginOutline, ArrowLeftOutline, LockOutline, MailOutline, FontColorsOutline} from '@ant-design/icons-angular/icons';
const icons: IconDefinition[] = [ UserOutline, TeamOutline, FileSearchOutline, UserAddOutline, LoginOutline, ArrowLeftOutline, LockOutline, MailOutline, FontColorsOutline];
//import components
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UtentiComponent } from './utenti/utenti.component';
import { ClientiComponent } from './Clienti-components/clienti/clienti.component';
import { NuovoClienteComponent } from './Clienti-components/nuovo-cliente/nuovo-cliente.component';
import { FattureComponent } from './Fatture-components/fatture/fatture.component';
import { NuovaFatturaComponent } from './Fatture-components/nuova-fattura/nuova-fattura.component';
import { DettaglioClienteComponent } from './Clienti-components/dettaglio-cliente/dettaglio-cliente.component';
import { DettaglioFatturaComponent } from './Fatture-components/dettaglio-fattura/dettaglio-fattura.component';
import { ModificaClienteComponent } from './Clienti-components/modifica-cliente/modifica-cliente.component';
import { ModificaFatturaComponent } from './Fatture-components/modifica-fattura/modifica-fattura.component';
import { FatturaDaClientiComponent } from './Fatture-components/fattura-da-clienti/fattura-da-clienti.component';
import { CercaClienteComponent } from './Clienti-components/cerca-cliente/cerca-cliente.component';
import { CercaFatturaComponent } from './Fatture-components/cerca-fattura/cerca-fattura.component';
import { AdminComponent } from './admin/admin.component';

//internationalization
import { NZ_I18N, it_IT } from 'ng-zorro-antd/i18n';
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
    component:LandingPageComponent,
    canActivate:[LoginGuardGuard]
  },
  {
    path:"home",
    component:HomepageComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path:"login",
    component:LoginComponent,
    canActivate:[LoginGuardGuard]
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"clienti",
    component:ClientiComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path:"clienti/:id",
    component:DettaglioClienteComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path:"fatture",
    component:FattureComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path:"fatture/:id",
    component:DettaglioFatturaComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path:"utenti",
    component:UtentiComponent,
    canActivate:[AuthGuardGuard]
  },
  {
    path:"admin",
    component:AdminComponent,
    canActivate:[AdminGuard]
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
    FatturaDaClientiComponent,
    CercaClienteComponent,
    CercaFatturaComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzIconModule.forRoot(icons),
    NgZorroModule
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
