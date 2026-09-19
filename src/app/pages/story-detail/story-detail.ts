import {
  Component,
  effect,
  inject,
  input,
  OnDestroy,
  signal,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { StoryService } from "../../core/services/story.service";
import { SpeechService, SpeechSegment } from "../../core/services/speech.service";
import { SeoService, DEFAULT_TITLE } from "../../core/services/seo.service";
import { Story, StorySummary } from "../../core/models/story.model";

@Component({
  imports: [RouterLink],
  selector: "app-story-detail",
  styleUrl: "./story-detail.scss",
  templateUrl: "./story-detail.html",
})
export class StoryDetail implements OnDestroy {
  private readonly storyService = inject(StoryService);
  private readonly seoService = inject(SeoService);
  readonly speech: SpeechService = inject(SpeechService);

  readonly slug = input.required<string>();
  readonly story = signal<Story | undefined>(undefined);
  readonly moreStories = signal<StorySummary[]>([]);
  readonly loading = signal(true);
  private speechSegments: SpeechSegment[] = [];

  constructor() {
    effect(() => {
      const slug = this.slug();
      this.loading.set(true);
      this.storyService.getStoryBySlug(slug).subscribe((story) => {
        this.story.set(story);
        this.loading.set(false);
        if (story) {
          this.speechSegments = this.buildSpeechSegments(story);
          this.seoService.applyStory(story);
        } else {
          this.speechSegments = [];
          this.seoService.applyDefaults(DEFAULT_TITLE);
        }
      });
    });

    this.storyService.getStories().subscribe((stories) => {
      const withoutCurrent = stories.filter((s) => s.slug !== this.slug());
      const pool = withoutCurrent.slice(0, 4);
      this.moreStories.set(pool);
    });

    effect(() => {
      const segmentId = this.speech.currentSegmentId();
      if (!segmentId || segmentId === "intro" || !this.story()) {
        return;
      }
      const element = document.getElementById(`segment-${segmentId}`);
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  ngOnDestroy(): void {
    this.speech.stop();
  }

  pad(id: number): string {
    return String(id).padStart(4, "0");
  }

  private buildSpeechSegments(story: Story): SpeechSegment[] {
    const segments: SpeechSegment[] = [
      { id: `intro`, text: story.introduction },
    ];
    story.chapters?.forEach((chapter, index) => {
      segments.push({
        id: `heading-${index}`,
        text: `Chapter ${index + 1}. ${chapter.heading}`,
      });
      chapter.paragraphs.forEach((paragraph, paraIndex) => {
        segments.push({ id: `para-${index}-${paraIndex}`, text: paragraph });
      });
    });
    return segments;
  }

  speak(): void {
    this.speech.play(this.speechSegments);
  }

  pause(): void {
    this.speech.pause();
  }

  resume(): void {
    this.speech.resume();
  }

  stopSpeech(): void {
    this.speech.stop();
  }
}
