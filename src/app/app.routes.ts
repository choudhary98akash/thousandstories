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
    path: "people",
    title: "People — A Thousand Stories",
    loadComponent: () => import("./pages/people/people").then((m) => m.People),
  },
  {
    path: "collections",
    title: "Collections — A Thousand Stories",
    loadComponent: () =>
      import("./pages/collections/collections").then((m) => m.Collections),
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
