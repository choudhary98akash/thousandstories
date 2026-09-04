import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable, shareReplay } from "rxjs";
import { Story } from "../models/story.model";

@Injectable({ providedIn: "root" })
export class StoryService {
  private readonly http = inject(HttpClient);

  private readonly allStories$ = this.http
    .get<Story[]>("assets/data/stories.json")
    .pipe(shareReplay(1));

  getStories(): Observable<Story[]> {
    return this.allStories$;
  }

  getStoryBySlug(slug: string): Observable<Story | undefined> {
    return this.allStories$.pipe(
      map((stories) => stories.find((story) => story.slug === slug)),
    );
  }

  searchStories(query: string): Observable<Story[]> {
    const q = query.trim().toLowerCase();
    if (!q) {
      return this.allStories$;
    }
    return this.allStories$.pipe(
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
