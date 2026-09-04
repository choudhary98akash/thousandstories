import { bootstrapApplication } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { appConfig } from "./app/app.config";
import { App } from "./app/app";

const RESTORE_KEY = "gh-pages-404";

bootstrapApplication(App, appConfig)
  .then((appRef) => {
    // GitHub Pages serves 404.html for any deep link. That fallback stores the
    // originally requested URL and redirects to the root; here we restore the
    // route so direct story links and page refreshes work on a static host.
    const pending = sessionStorage.getItem(RESTORE_KEY);
    if (pending) {
      sessionStorage.removeItem(RESTORE_KEY);
      const path = pending.replace(/^\/thousandstories/, "");
      const router = appRef.injector.get(Router);
      router.navigateByUrl(path.length ? path : "/");
    }
  })
  .catch((err) => console.error(err));
