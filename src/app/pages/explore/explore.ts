import { Component, computed, inject, signal } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { StoryService } from "../../core/services/story.service";
import { StorySummary } from "../../core/models/story.model";
import { StoryCard } from "../../shared/story-card/story-card";

type ExploreView = "stories" | "people" | "collections";

interface PersonEntry {
  letter: string;
  people: StorySummary[];
}

interface Collection {
  name: string;
  stories: StorySummary[];
}

const VIEW_ORDER: readonly ExploreView[] = ["stories", "people", "collections"];

function isExploreView(value: unknown): value is ExploreView {
  return (
    typeof value === "string" && (VIEW_ORDER as readonly string[]).includes(value)
  );
}

@Component({
  imports: [RouterLink, StoryCard],
  selector: "app-explore",
  styleUrl: "./explore.scss",
  templateUrl: "./explore.html",
})
export class Explore {
  private readonly storyService = inject(StoryService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly views = VIEW_ORDER;
  readonly stories = signal<StorySummary[]>([]);
  readonly activeView = signal<ExploreView>("stories");
  readonly categories = signal<string[]>([]);
  readonly countries = signal<string[]>([]);
  readonly selectedCategory = signal<string>("");
  readonly selectedCountry = signal<string>("");
  readonly query = signal("");
  readonly loading = signal(true);

  readonly filteredStories = computed(() => {
    const q = this.query().trim().toLowerCase();
    const category = this.selectedCategory();
    const country = this.selectedCountry();

    return this.stories().filter((story) => {
      const matchesCategory = !category || story.category.includes(category);
      const matchesCountry = !country || story.country === country;
      const matchesQuery =
        !q ||
        story.personName.toLowerCase().includes(q) ||
        story.title.toLowerCase().includes(q) ||
        story.country.toLowerCase().includes(q) ||
        story.category.some((c) => c.toLowerCase().includes(q)) ||
        story.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesCountry && matchesQuery;
    });
  });

  readonly people = computed<PersonEntry[]>(() => {
    const grouped = new Map<string, StorySummary[]>();
    const sorted = [...this.stories()].sort((a, b) =>
      a.personName.localeCompare(b.personName),
    );

    for (const story of sorted) {
      const letter = story.personName.charAt(0).toUpperCase();
      if (!grouped.has(letter)) {
        grouped.set(letter, []);
      }
      grouped.get(letter)!.push(story);
    }

    return [...grouped.entries()].map(([letter, list]) => ({
      letter,
      people: list,
    }));
  });

  readonly collections = computed<Collection[]>(() => {
    const grouped = new Map<string, StorySummary[]>();

    for (const story of this.stories()) {
      for (const category of story.category) {
        if (!grouped.has(category)) {
          grouped.set(category, []);
        }
        grouped.get(category)!.push(story);
      }
    }

    return [...grouped.entries()]
      .map(([name, list]) => ({ name, stories: list }))
      .filter((collection) => collection.stories.length > 0)
      .sort(
        (a, b) =>
          b.stories.length - a.stories.length || a.name.localeCompare(b.name),
      );
  });

  constructor() {
    this.storyService.getStories().subscribe((stories) => {
      this.stories.set(stories);
      this.categories.set(
        [...new Set(stories.flatMap((s) => s.category))].sort(),
      );
      this.countries.set([...new Set(stories.map((s) => s.country))].sort());
      this.loading.set(false);
    });

    this.route.queryParams.subscribe((params) => {
      const view = params["view"];
      this.activeView.set(isExploreView(view) ? view : "stories");
      this.selectedCategory.set(params["category"] ?? "");
      this.selectedCountry.set(params["country"] ?? "");
    });
  }

  viewLabel(view: ExploreView): string {
    switch (view) {
      case "stories":
        return "Stories";
      case "people":
        return "People";
      case "collections":
        return "Collections";
    }
  }

  setView(view: ExploreView): void {
    this.activeView.set(view);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { view },
      queryParamsHandling: "merge",
    });
  }

  onTabKeydown(event: KeyboardEvent): void {
    const currentTarget = event.currentTarget;
    if (!(currentTarget instanceof HTMLElement)) {
      return;
    }

    const handledKeys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!handledKeys.includes(event.key)) {
      return;
    }

    event.preventDefault();

    const currentIndex = VIEW_ORDER.indexOf(this.activeView());
    let nextIndex = currentIndex;
    switch (event.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % VIEW_ORDER.length;
        break;
      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + VIEW_ORDER.length) % VIEW_ORDER.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = VIEW_ORDER.length - 1;
        break;
    }

    const nextView = VIEW_ORDER[nextIndex];
    if (!nextView) {
      return;
    }

    this.setView(nextView);

    const tabs = currentTarget
      .closest('[role="tablist"]')
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabs?.[nextIndex]?.focus();
  }

  onSearchInput(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.query.set(target.value);
    }
  }

  onCategoryChange(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLSelectElement) {
      this.selectedCategory.set(target.value);
    }
  }

  onCountryChange(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLSelectElement) {
      this.selectedCountry.set(target.value);
    }
  }

  scrollToLetter(letter: string): void {
    if (typeof document === "undefined") {
      return;
    }
    const target = document.getElementById(`letter-${letter}`);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
