import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VersionBarComponent } from './components/version-bar/version-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VersionBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
