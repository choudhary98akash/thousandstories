import { Component, computed, inject, signal } from "@angular/core";
import { StorySummary } from "../../core/models/story.model";
import { EbookService } from "../../core/services/ebook.service";
import { StoryService } from "../../core/services/story.service";

@Component({
  selector: "app-ebook-builder",
  styleUrl: "./ebook-builder.scss",
  templateUrl: "./ebook-builder.html",
})
export class EbookBuilder {
  private readonly storyService = inject(StoryService);
  private readonly ebookService = inject(EbookService);

  readonly stories = signal<StorySummary[]>([]);
  readonly query = signal("");
  readonly selected = signal<ReadonlySet<string>>(new Set<string>());
  readonly loading = signal(true);
  readonly building = signal(false);
  readonly status = signal("");
  readonly error = signal("");
  readonly openedTab = signal(false);
  readonly ready = signal(false);

  private lastHtml = "";

  readonly visibleStories = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) {
      return this.stories();
    }
    return this.stories().filter(
      (story) =>
        story.personName.toLowerCase().includes(q) ||
        story.title.toLowerCase().includes(q) ||
        story.country.toLowerCase().includes(q) ||
        story.category.some((category) => category.toLowerCase().includes(q)) ||
        story.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  });

  readonly selectedCount = computed(() => this.selected().size);

  constructor() {
    this.storyService.getStories().subscribe((stories) => {
      this.stories.set(stories);
      this.loading.set(false);
    });
  }

  onQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  toggle(slug: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.selected.update((current) => {
      const next = new Set(current);
      if (checked) {
        next.add(slug);
      } else {
        next.delete(slug);
      }
      return next;
    });
  }

  selectAll(): void {
    const visible = this.visibleStories().map((story) => story.slug);
    this.selected.update((current) => {
      const next = new Set(current);
      visible.forEach((slug) => next.add(slug));
      return next;
    });
  }

  clear(): void {
    this.selected.set(new Set<string>());
  }

  build(): void {
    const chosen = this.stories()
      .filter((story) => this.selected().has(story.slug))
      .map((story) => story.slug);
    if (!chosen.length || this.building()) {
      return;
    }

    this.error.set("");
    this.ready.set(false);

    // Open the tab synchronously, before any await, or the browser blocks it.
    const tab = this.ebookService.openTab();
    if (!tab) {
      this.error.set(
        "Your browser blocked the new tab. Allow pop-ups for this site and try again.",
      );
      return;
    }

    this.ebookService.showPreparing(tab);
    this.openedTab.set(true);
    this.building.set(true);
    this.status.set(
      `Collecting ${chosen.length} ${chosen.length === 1 ? "story" : "stories"}…`,
    );

    this.ebookService
      .buildDocument(chosen, (done, total) => {
        this.status.set(`Collected ${done} of ${total} stories…`);
      })
      .then((html) => {
        this.lastHtml = html;
        this.ebookService.writeToTab(tab, html);
        this.ready.set(true);
        this.status.set(
          `Your eBook is ready in the new tab. Choose “Print / Save as PDF” there, or download the HTML below.`,
        );
      })
      .catch(() => {
        this.ebookService.showError(tab);
        this.error.set("We could not build this eBook. Please try again.");
      })
      .finally(() => {
        this.building.set(false);
      });
  }

  download(): void {
    if (this.lastHtml) {
      this.ebookService.downloadHtml(this.lastHtml);
    }
  }

  pad(id: number): string {
    return String(id).padStart(4, "0");
  }
}
