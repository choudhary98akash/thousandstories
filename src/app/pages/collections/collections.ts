import { Component, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { StoryService } from "../../core/services/story.service";
import { Story } from "../../core/models/story.model";

interface Collection {
  name: string;
  stories: Story[];
}

@Component({
  imports: [RouterLink],
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
      const map = new Map<string, Story[]>();
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

  pad(id: number): string {
    return String(id).padStart(4, "0");
  }
}
