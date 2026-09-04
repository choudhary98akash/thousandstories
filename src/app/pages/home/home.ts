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

  readonly featuredStory = signal<Story | undefined>(undefined);
  readonly recentStories = signal<Story[]>([]);

  constructor() {
    this.storyService.getStories().subscribe((stories) => {
      this.featuredStory.set(stories[0]);
      this.recentStories.set(stories.slice(0, 3));
    });
  }

  randomStory(): void {
    this.storyService.getStories().subscribe((stories) => {
      if (stories.length) {
        const random = stories[Math.floor(Math.random() * stories.length)];
        window.location.href = `/stories/${random.slug}`;
      }
    });
  }
}
