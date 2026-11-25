import { Component, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { StoryService } from "../../core/services/story.service";
import { StorySummary } from "../../core/models/story.model";
import { StoryCard } from "../../shared/story-card/story-card";

interface Collection {
  name: string;
  stories: StorySummary[];
}

@Component({
  imports: [RouterLink, StoryCard],
  selector: "app-collections",
  styleUrl: "./collections.scss",
  templateUrl: "./collections.html",
})
export class Collections {
  private readonly storyService = inject(StoryService);

  readonly collections = signal<Collection[]>([]);
  readonly loading = signal(true);

  constructor() {
    this.storyService.getStories().subscribe((stories) => {
      const map = new Map<string, StorySummary[]>();
      for (const story of stories) {
        for (const cat of story.category) {
          if (!map.has(cat)) {
            map.set(cat, []);
          }
          map.get(cat)!.push(story);
        }
      }
      const sorted = [...map.entries()]
        .map(([name, list]) => ({ name, stories: list }))
        .filter((c) => c.stories.length > 0)
        .sort((a, b) => b.stories.length - a.stories.length);
      this.collections.set(sorted);
      this.loading.set(false);
    });
  }
}
