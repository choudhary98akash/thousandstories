import { Component, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { StoryService } from "../../core/services/story.service";
import { Story } from "../../core/models/story.model";

interface PersonEntry {
  letter: string;
  people: Story[];
}

@Component({
  imports: [RouterLink],
  selector: "app-people",
  styleUrl: "./people.scss",
  templateUrl: "./people.html",
})
export class People {
  private readonly storyService = inject(StoryService);

  readonly people = signal<PersonEntry[]>([]);
  readonly count = signal(0);
  readonly loading = signal(true);

  constructor() {
    this.storyService.getStories().subscribe((stories) => {
      this.count.set(stories.length);
      const sorted = [...stories].sort((a, b) =>
        a.personName.localeCompare(b.personName),
      );
      const grouped = new Map<string, Story[]>();
      for (const story of sorted) {
        const letter = story.personName.charAt(0).toUpperCase();
        if (!grouped.has(letter)) {
          grouped.set(letter, []);
        }
        grouped.get(letter)!.push(story);
      }
      this.people.set(
        [...grouped.entries()].map(([letter, list]) => ({
          letter,
          people: list,
        })),
      );
      this.loading.set(false);
    });
  }
}
