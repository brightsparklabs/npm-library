import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  Router,
  RouterOutlet,
  RouterLinkWithHref,
  NavigationEnd,
} from '@angular/router';
import { Toolbar } from 'primeng/toolbar';
import { Button } from 'primeng/button';
import { Drawer } from 'primeng/drawer';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import { Breadcrumb } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Toolbar,
    Breadcrumb,
    Button,
    Drawer,
    RouterLinkWithHref,
],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  // -----------------------------------------------------------------------------------------------
  // DEPENDENCIES
  // -----------------------------------------------------------------------------------------------

  private readonly router = inject(Router);

  // -----------------------------------------------------------------------------------------------
  // INSTANCE VARIABLES
  // -----------------------------------------------------------------------------------------------

  protected readonly expanded = signal(false);

  private readonly navigationEnd = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      // Generate a new value so the signal updates.
      map(() => Date.now()),
    ),
  );

  readonly breadcrumb = computed<Array<MenuItem>>(() => {
    // Reload the content any time the navigate ends.
    this.navigationEnd();

    const breadcrumb = this.router.url
      .split('/')
      .filter((label) => label !== '')
      .map((label) => ({ label }));

    return [
      {
        label: '@brightsparklabs/angular-toolkit',
        routerLink: '/',
      },
      ...breadcrumb,
    ];
  });

  protected readonly componentPages = computed<
    Array<{ path: string; label: string }>
  >(() => {
    // Reload the content any time the navigate ends.
    this.navigationEnd();

    const dashboardRoute = this.router.config.find(
      (r) => r.path === 'components',
    );

    return (
      dashboardRoute?.children?.map((route) => ({
        path: `/components/${route.path}`,
        label: route.path!,
      })) ?? []
    );
  });

  protected readonly theme = signal<'LIGHT' | 'DARK'>(
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'DARK'
      : 'LIGHT',
  );

  // -----------------------------------------------------------------------------------------------
  // CONSTRUCTION
  // -----------------------------------------------------------------------------------------------

  /** Default component constructor. */
  constructor() {
    window
      // Watches for changes to a user preferred theme i.e. when a user updates their system theme.
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () =>
        this.theme.set(
          window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'DARK'
            : 'LIGHT',
        ),
      );
    effect(() => {
      if (
        document.documentElement.getAttribute('data-theme') !== this.theme()
      ) {
        document.documentElement.setAttribute('data-theme', this.theme());
      }
    });
  }
}
