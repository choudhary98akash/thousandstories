import { Component, effect, inject, input, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { StoryService } from "../../core/services/story.service";
import { Story } from "../../core/models/story.model";

@Component({
  imports: [RouterLink],
  selector: "app-story-detail",
  styleUrl: "./story-detail.scss",
  templateUrl: "./story-detail.html",
})
export class StoryDetail {
  private readonly storyService = inject(StoryService);

  readonly slug = input.required<string>();
  readonly story = signal<Story | undefined>(undefined);
  readonly loading = signal(true);

  constructor() {
    effect(() => {
      const slug = this.slug();
      this.loading.set(true);
      this.storyService.getStoryBySlug(slug).subscribe((story) => {
        this.story.set(story);
        this.loading.set(false);
      });
    });
  }
}
