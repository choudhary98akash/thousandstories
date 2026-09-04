import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { StoryService } from "../../core/services/story.service";
import { Story } from "../../core/models/story.model";

@Component({
  imports: [RouterLink],
  selector: "app-explore",
  styleUrl: "./explore.scss",
  templateUrl: "./explore.html",
})
export class Explore {
  private readonly storyService = inject(StoryService);
  private readonly route = inject(ActivatedRoute);

  readonly stories = signal<Story[]>([]);
  readonly categories = signal<string[]>([]);
  readonly countries = signal<string[]>([]);
  readonly selectedCategory = signal<string>("");
  readonly selectedCountry = signal<string>("");
  readonly query = signal("");
  readonly loading = signal(true);

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
      const category = params["category"];
      const country = params["country"];
      if (category) {
        this.selectedCategory.set(category);
      }
      if (country) {
        this.selectedCountry.set(country);
      }
    });
  }

  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  setCountry(country: string): void {
    this.selectedCountry.set(country);
  }

  setQuery(value: string): void {
    this.query.set(value);
  }

  filteredStories(): Story[] {
    const q = this.query().trim().toLowerCase();
    return this.stories().filter((story) => {
      const matchesCategory =
        !this.selectedCategory() ||
        story.category.includes(this.selectedCategory());
      const matchesCountry =
        !this.selectedCountry() || story.country === this.selectedCountry();
      const matchesQuery =
        !q ||
        story.personName.toLowerCase().includes(q) ||
        story.title.toLowerCase().includes(q) ||
        story.country.toLowerCase().includes(q) ||
        story.category.some((c) => c.toLowerCase().includes(q)) ||
        story.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesCountry && matchesQuery;
    });
  }

  pad(id: number): string {
    return String(id).padStart(4, "0");
  }
}
