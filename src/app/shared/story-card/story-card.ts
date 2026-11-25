import { Component, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { StorySummary } from "../../core/models/story.model";

@Component({
  selector: "app-story-card",
  imports: [RouterLink],
  templateUrl: "./story-card.html",
  styleUrl: "./story-card.scss",
})
export class StoryCard {
  readonly story = input.required<StorySummary>();

  pad(id: number): string {
    return String(id).padStart(4, "0");
  }
}
