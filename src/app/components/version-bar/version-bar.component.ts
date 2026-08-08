import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-version-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './version-bar.component.html',
  styleUrl: './version-bar.component.scss'
})
export class VersionBarComponent {
  readonly versions = [
    { path: '/v1', label: 'Versión 1', ready: true },
    { path: '/v2', label: 'Versión 2', ready: false },
    { path: '/v3', label: 'Versión 3', ready: false }
  ];
}
