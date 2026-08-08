import { Routes } from '@angular/router';
import { Version1Component } from './pages/version1/version1.component';
import { Version2Component } from './pages/version2/version2.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'v1' },
  { path: 'v1', component: Version1Component },
  { path: 'v2', component: Version2Component },
  { path: 'v3', component: ComingSoonComponent, data: { label: 'Versión 3' } },
  { path: '**', redirectTo: 'v1' }
];
