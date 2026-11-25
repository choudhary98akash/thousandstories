import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    title: "A Thousand Stories — Real Stories of Real People",
    loadComponent: () => import("./pages/home/home").then((m) => m.Home),
  },
  {
    path: "stories",
    title: "Explore Stories — A Thousand Stories",
    loadComponent: () =>
      import("./pages/explore/explore").then((m) => m.Explore),
  },
  {
    path: "stories/:slug",
    title: "Story — A Thousand Stories",
    loadComponent: () =>
      import("./pages/story-detail/story-detail").then((m) => m.StoryDetail),
  },
  {
    path: "ebook",
    title: "Create eBook — A Thousand Stories",
    loadComponent: () =>
      import("./pages/ebook-builder/ebook-builder").then(
        (m) => m.EbookBuilder,
      ),
  },
  {
    path: "people",
    pathMatch: "full",
    redirectTo: ({ queryParams }) => {
      const params = new URLSearchParams(queryParams as Record<string, string>);
      params.set("view", "people");
      return `/stories?${params.toString()}`;
    },
  },
  {
    path: "collections",
    pathMatch: "full",
    redirectTo: ({ queryParams }) => {
      const params = new URLSearchParams(queryParams as Record<string, string>);
      params.set("view", "collections");
      return `/stories?${params.toString()}`;
    },
  },
  {
    path: "about",
    title: "About — A Thousand Stories",
    loadComponent: () => import("./pages/about/about").then((m) => m.About),
  },
  {
    path: "methodology",
    title: "Sources & Methodology — A Thousand Stories",
    loadComponent: () =>
      import("./pages/methodology/methodology").then((m) => m.Methodology),
  },
  { path: "**", redirectTo: "" },
];
