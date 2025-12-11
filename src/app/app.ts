import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, ButtonModule],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('rpg-companion');
}
