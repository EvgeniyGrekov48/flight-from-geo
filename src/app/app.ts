import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MainMap } from './features/main-map/main-map';

@Component({
  selector: 'app-root',
  imports: [MainMap],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('flight-from-geo');
}
