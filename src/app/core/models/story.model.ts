export interface Source {
  title: string;
  publisher: string;
  url: string;
  publishedDate?: string;
}

export interface Story {
  id: number;
  title: string;
  slug: string;
  personName: string;
  shortDescription: string;
  country: string;
  state?: string;
  city?: string;
  category: string[];
  birthYear?: number;
  deathYear?: number;
  storyDate?: string;
  heroImage?: string;
  introduction: string;
  challenge: string;
  journey: string;
  achievement: string;
  impact: string;
  lesson: string;
  sources: Source[];
  tags: string[];
  verified: boolean;
}
