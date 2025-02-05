import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  public actualTheme: WritableSignal<string> = signal('dark');

  public init() {
    const html = document.querySelector('html');
    if (localStorage) {
      const theme = localStorage.getItem('theme');
      if (theme == null && html) {
        localStorage.setItem('theme', 'dark');

        html.dataset['theme'] = this.actualTheme();
        return;
      }
      if (html && theme) {
        html.dataset['theme'] = this.actualTheme();

        return;
      }
    }
  }

  public changeTheme() {
    const ls = localStorage;
    if (!ls) {
      return;
    }

    const localTheme = ls.getItem('theme');

    if (!localTheme) {
      return;
    }

    if (!this.findTheme(localTheme)) {
      ls.setItem('theme', 'dark');
      return;
    }

    if (localTheme === 'dark') {
      ls.setItem('theme', 'light');
      this.actualTheme.set('light');
      return;
    }

    if (localTheme === 'light') {
      ls.setItem('theme', 'dark');
      this.actualTheme.set('dark');
      return;
    }

    return;
  }

  private findTheme(targetTheme: string) {
    return ['dark', 'light'].includes(targetTheme);
  }
}
