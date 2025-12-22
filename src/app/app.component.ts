import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MainLayoutComponent } from "./ui/main-layout/main-layout.component";
import { TuiRoot } from "@taiga-ui/core";

@Component({
  selector: 'app-root',
  imports: [TuiRoot, MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('flight-from-geo');
}
