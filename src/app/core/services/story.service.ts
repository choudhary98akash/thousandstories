import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable, of, shareReplay } from "rxjs";
import { Story, StorySummary } from "../models/story.model";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

@Injectable({ providedIn: "root" })
export class StoryService {
  private readonly http = inject(HttpClient);

  private readonly index$ = this.http
    .get<StorySummary[]>("assets/data/stories/index.json")
    .pipe(shareReplay(1));

  private readonly storyCache = new Map<string, Observable<Story | undefined>>();

  getStories(): Observable<StorySummary[]> {
    return this.index$;
  }

  getStoryBySlug(slug: string): Observable<Story | undefined> {
    if (!SLUG_PATTERN.test(slug)) {
      return of(undefined);
    }
    let cached = this.storyCache.get(slug);
    if (!cached) {
      cached = this.http
        .get<Story>(`assets/data/stories/${slug}.json`)
        .pipe(shareReplay(1));
      this.storyCache.set(slug, cached);
    }
    return cached;
  }

  searchStories(query: string): Observable<StorySummary[]> {
    const q = query.trim().toLowerCase();
    if (!q) {
      return this.index$;
    }
    return this.index$.pipe(
      map((stories) =>
        stories.filter(
          (story) =>
            story.personName.toLowerCase().includes(q) ||
            story.title.toLowerCase().includes(q) ||
            story.country.toLowerCase().includes(q) ||
            (story.state?.toLowerCase().includes(q) ?? false) ||
            (story.city?.toLowerCase().includes(q) ?? false) ||
            story.category.some((c) => c.toLowerCase().includes(q)) ||
            story.tags.some((t) => t.toLowerCase().includes(q)),
        ),
      ),
    );
  }
}