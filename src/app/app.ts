import {
  ApplicationConfig,
  ChangeDetectionStrategy,
  Component,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  signal
} from '@angular/core';
import { MainLayoutComponent } from "./ui/main-layout/main-layout.component";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
  ]
};

@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent],
  template: `
    <app-main-layout/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('flight-from-geo');
}
