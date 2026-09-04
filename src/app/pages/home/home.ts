import { Component, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { StoryService } from "../../core/services/story.service";
import { Story } from "../../core/models/story.model";

@Component({
  imports: [RouterLink],
  selector: "app-home",
  styleUrl: "./home.scss",
  templateUrl: "./home.html",
})
export class Home {
  private readonly storyService = inject(StoryService);

  readonly stories = signal<Story[]>([]);
  readonly featured = signal<Story | undefined>(undefined);
  readonly lesserKnown = signal<Story[]>([]);
  readonly countries = signal<string[]>([]);
  readonly categories = signal<string[]>([]);

  readonly counts = signal({ stories: 0, countries: 0, categories: 0 });

  constructor() {
    this.storyService.getStories().subscribe((stories) => {
      this.stories.set(stories);
      this.featured.set(this.pickFeatured(stories));
      this.lesserKnown.set(stories.slice(0, 3));
      this.countries.set([...new Set(stories.map((s) => s.country))].sort());
      this.categories.set(
        [...new Set(stories.flatMap((s) => s.category))].sort(),
      );
      this.counts.set({
        stories: stories.length,
        countries: new Set(stories.map((s) => s.country)).size,
        categories: new Set(stories.flatMap((s) => s.category)).size,
      });
    });
  }

  private pickFeatured(stories: Story[]): Story | undefined {
    if (stories.length === 0) {
      return undefined;
    }
    const day = Math.floor(Date.now() / 86_400_000);
    return stories[day % stories.length];
  }

  randomStory(): void {
    const stories = this.stories();
    if (stories.length) {
      const random = stories[Math.floor(Math.random() * stories.length)];
      window.location.href = `/stories/${random.slug}`;
    }
  }

  pad(id: number): string {
    return String(id).padStart(4, "0");
  }
}
