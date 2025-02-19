import { afterRender, Component, inject } from '@angular/core';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';
import { ThemeService } from '../../shared/Theme/ThemeService';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [LucideAngularModule],
  providers: [ThemeService, RouterLink],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  Moon = Moon;
  Sun = Sun;

  public themeService: ThemeService = inject(ThemeService);

  constructor() {
    afterRender(() => {
      this.themeService.init();
    });
  }
}
