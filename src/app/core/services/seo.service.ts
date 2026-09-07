import { Injectable, inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { Story } from "../models/story.model";

export const DEFAULT_TITLE = "A Thousand Stories — Real Stories of Real People";
const DEFAULT_DESCRIPTION =
  "1,000 real stories of real people from around the world. No fiction. No invented heroes. Only stories supported by factual sources.";
const SITE_NAME = "A Thousand Stories";

function truncate(value: string, max = 155): string {
  const trimmed = value.trim();
  return trimmed.length <= max
    ? trimmed
    : `${trimmed.slice(0, max - 1).trimEnd()}…`;
}

@Injectable({ providedIn: "root" })
export class SeoService {
  private readonly document = inject(DOCUMENT);

  private get location(): Location | null {
    return this.document.defaultView?.location ?? null;
  }

  private get fullUrl(): string {
    if (!this.location) {
      return "";
    }
    return `${this.location.origin}${this.location.pathname}${this.location.search}`;
  }

  private absoluteUrl(path: string): string {
    if (!path) {
      return "";
    }
    return new URL(path, this.document.baseURI).href;
  }

  private upsertMeta(
    nameOrProperty: "name" | "property",
    key: string,
    content: string,
  ): void {
    let meta = this.document.head.querySelector<HTMLMetaElement>(
      `meta[${nameOrProperty}="${key}"]`,
    );
    if (!meta) {
      meta = this.document.createElement("meta");
      meta.setAttribute(nameOrProperty, key);
      this.document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
  }

  private upsertLink(rel: string, href: string): void {
    const link = this.document.head.querySelector<HTMLLinkElement>(
      `link[rel="${rel}"]`,
    );
    if (link) {
      link.setAttribute("href", href);
      return;
    }
    const created = this.document.createElement("link");
    created.setAttribute("rel", rel);
    created.setAttribute("href", href);
    this.document.head.appendChild(created);
  }

  private setJsonLd(data: Record<string, unknown>, id: string): void {
    this.removeJsonLd();
    const script = this.document.createElement("script");
    script.type = "application/ld+json";
    script.id = id;
    script.textContent = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  private removeJsonLd(): void {
    this.document.head
      .querySelectorAll<HTMLScriptElement>("script[type='application/ld+json']")
      .forEach((node) => node.remove());
  }

  applyStory(story: Story): void {
    this.setTitle(
      `${story.personName} — A Real Story · ${SITE_NAME}`,
    );
    this.setDescription(story.shortDescription);

    const canonical = this.fullUrl;
    const image = this.absoluteUrl(story.heroImage ?? "");
    const twitterImage = image || this.absoluteUrl("favicon.svg");

    this.setCanonical(canonical);
    this.upsertMeta("property", "og:title", story.title);
    this.upsertMeta("property", "og:description", truncate(story.shortDescription));
    this.upsertMeta("property", "og:type", "article");
    this.upsertMeta("property", "og:url", canonical);
    this.upsertMeta("property", "og:site_name", SITE_NAME);
    this.upsertMeta("property", "og:image", image);

    this.upsertMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    this.upsertMeta("name", "twitter:title", story.title);
    this.upsertMeta("name", "twitter:description", truncate(story.shortDescription));
    this.upsertMeta("name", "twitter:image", twitterImage);
    this.upsertMeta("name", "twitter:site", "@thousandstories");

    this.setJsonLd(this.articleJsonLd(story, canonical, image), "story-jsonld");
  }

  applyDefaults(title: string): void {
    this.setTitle(title);
    this.setDescription(DEFAULT_DESCRIPTION);

    const canonical = this.fullUrl;
    this.setCanonical(canonical);
    this.upsertMeta("property", "og:title", title);
    this.upsertMeta("property", "og:description", DEFAULT_DESCRIPTION);
    this.upsertMeta("property", "og:type", "website");
    this.upsertMeta("property", "og:url", canonical);
    this.upsertMeta("property", "og:site_name", SITE_NAME);
    this.upsertMeta("name", "twitter:card", "summary");
    this.upsertMeta("name", "twitter:title", title);
    this.upsertMeta("name", "twitter:description", DEFAULT_DESCRIPTION);
    this.removeJsonLd();
  }

  private setTitle(title: string): void {
    this.document.title = title;
  }

  private setDescription(description: string): void {
    this.upsertMeta("name", "description", truncate(description));
  }

  private setCanonical(url: string): void {
    if (url) {
      this.upsertLink("canonical", url);
    }
  }

  private articleJsonLd(
    story: Story,
    canonical: string,
    image: string,
  ): Record<string, unknown> {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: story.title,
      description: truncate(story.shortDescription),
      about: story.personName,
      author: { "@type": "Person", name: story.personName },
      datePublished: story.storyDate ?? String(story.birthYear ?? ""),
      image,
      mainEntityOfPage: canonical,
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    };
  }
}