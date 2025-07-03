import { Routes } from '@angular/router';
import { NavadminComponent } from './layouts/navadmin/navadmin.component';
import { DeshbordeComponent } from './components/deshborde/deshborde.component';
import { Ge1Component } from './components/ge1/ge1.component';
import { Ge2Component } from './components/ge2/ge2.component';
import { Ke1Component } from './components/ke1/ke1.component';
import { Ke2Component } from './components/ke2/ke2.component';
import { Ke3Component } from './components/ke3/ke3.component';
import { Mr1Component } from './components/mr1/mr1.component';
import { RE1Component } from './components/re1/re1.component';
import { NavblankComponent } from './layouts/navblank/navblank.component';
import { NavoutComponent } from './layouts/navout/navout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginmsComponent } from './components/loginms/loginms.component';
import { SetingComponent } from './components/seting/seting.component';
import { ViowdataComponent } from './components/viowdata/viowdata.component';

export const routes: Routes = [
  { path: '', redirectTo: 'navout/login', pathMatch: 'full' },  // هذا هو الافتراضي

  {
    path: 'Navadmin',
    component: NavadminComponent,
    children: [
      { path: '', redirectTo: 'deshborde', pathMatch: 'full' },
      { path: 'deshborde', component: DeshbordeComponent },
      { path: 'ge1', component: Ge1Component },
      { path: 'ge2', component: Ge2Component },
      { path: 'ke1', component: Ke1Component },
      { path: 'ke2', component: Ke2Component },
      { path: 'ke3', component: Ke3Component },
      { path: 'mr1', component: Mr1Component },
      { path: 're1', component: RE1Component },
      { path: 'seting', component: SetingComponent },
      {path:'viowdata',component:ViowdataComponent}
    ],
  },
  {
    path: 'Navblank',
    component: NavblankComponent,
    children: [
      { path: '', redirectTo: 'ke1', pathMatch: 'full' },
      { path: 'ke1', component: Ke1Component },
      { path: 'ke2', component: Ke2Component },
      { path: 'ke3', component: Ke3Component },
      { path: 'mr1', component: Mr1Component },
    ],
  },
  {
    path: 'navout',
    component: NavoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'loginms', component: LoginmsComponent },
    ],
  },
];
