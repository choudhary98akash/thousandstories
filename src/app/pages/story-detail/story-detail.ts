import { Component, effect, inject, input, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { StoryService } from "../../core/services/story.service";
import { SeoService, DEFAULT_TITLE } from "../../core/services/seo.service";
import { Story } from "../../core/models/story.model";

@Component({
  imports: [RouterLink],
  selector: "app-story-detail",
  styleUrl: "./story-detail.scss",
  templateUrl: "./story-detail.html",
})
export class StoryDetail {
  private readonly storyService = inject(StoryService);
  private readonly seoService = inject(SeoService);

  readonly slug = input.required<string>();
  readonly story = signal<Story | undefined>(undefined);
  readonly moreStories = signal<Story[]>([]);
  readonly loading = signal(true);

  constructor() {
    effect(() => {
      const slug = this.slug();
      this.loading.set(true);
      this.storyService.getStoryBySlug(slug).subscribe((story) => {
        this.story.set(story);
        this.loading.set(false);
        if (story) {
          this.seoService.applyStory(story);
        } else {
          this.seoService.applyDefaults(DEFAULT_TITLE);
        }
      });
    });

    this.storyService.getStories().subscribe((stories) => {
      const withoutCurrent = stories.filter((s) => s.slug !== this.slug());
      const pool = withoutCurrent.slice(0, 4);
      this.moreStories.set(pool);
    });
  }

  pad(id: number): string {
    return String(id).padStart(4, "0");
  }
}
