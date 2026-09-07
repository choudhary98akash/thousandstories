import { Component, inject, signal } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from "@angular/router";
import { filter } from "rxjs";
import { DEFAULT_TITLE, SeoService } from "./core/services/seo.service";

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: "app-root",
  styleUrl: "./app.scss",
  templateUrl: "./app.html",
})
export class App {
  private readonly seoService = inject(SeoService);

  readonly navOpen = signal(false);

  toggleNav(): void {
    this.navOpen.update((open) => !open);
  }

  closeNav(): void {
    this.navOpen.set(false);
  }

  constructor() {
    const router = inject(Router);
    const route = inject(ActivatedRoute);
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe({
        next: () => {
          // Story pages set their own SEO from the loaded story; only apply
          // static-page defaults here so we never clobber per-story metadata.
          const active = this.deepestRoute(route);
          if (active?.routeConfig?.path !== "stories/:slug") {
            this.seoService.applyDefaults(active?.snapshot.title ?? DEFAULT_TITLE);
          }
        },
      });
  }

  private deepestRoute(root: ActivatedRoute): ActivatedRoute {
    let route = root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}
