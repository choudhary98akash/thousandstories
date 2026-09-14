import { Injectable, signal } from "@angular/core";

export interface SpeechSegment {
  id: string;
  text: string;
}

const SENTENCE_RE = /[^.!?…]+[.!?…]+["')\]]?[ \t]*|[^.!?…]+$/g;

function splitSentences(text: string): string[] {
  const matches = text.trim().match(SENTENCE_RE);
  if (!matches) {
    return text.trim() ? [text.trim()] : [];
  }
  return matches.map((sentence) => sentence.trim()).filter((s) => s.length > 0);
}

@Injectable({ providedIn: "root" })
export class SpeechService {
  readonly supported = signal(false);
  readonly isSpeaking = signal(false);
  readonly isPaused = signal(false);
  readonly currentSegmentId = signal<string | null>(null);

  private readonly speech: SpeechSynthesis | null = null;
  private queue: SpeechSegment[] = [];
  private cursor = 0;
  private voice: SpeechSynthesisVoice | null = null;
  private watchdogId: number | null = null;
  private activeUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.speech = window.speechSynthesis;
      this.supported.set(true);
      this.pickVoice();
      window.speechSynthesis.addEventListener?.("voiceschanged", () => {
        this.pickVoice();
      });
    }
  }

  play(segments: SpeechSegment[]): void {
    if (!this.speech || segments.length === 0) {
      return;
    }
    this.stop();
    this.queue = segments.flatMap((segment) =>
      splitSentences(segment.text).map((sentence) => ({
        id: segment.id,
        text: sentence,
      })),
    );
    this.cursor = 0;
    this.isSpeaking.set(true);
    this.isPaused.set(false);
    this.speakNext();
    this.startWatchdog();
  }

  pause(): void {
    if (!this.speech || !this.isSpeaking() || this.isPaused()) {
      return;
    }
    this.speech.pause();
    this.isPaused.set(true);
  }

  resume(): void {
    if (!this.speech || !this.isSpeaking()) {
      return;
    }
    this.speech.resume();
    this.isPaused.set(false);
  }

  stop(): void {
    this.speech?.cancel();
    this.clearWatchdog();
    this.queue = [];
    this.cursor = 0;
    this.activeUtterance = null;
    this.isSpeaking.set(false);
    this.isPaused.set(false);
    this.currentSegmentId.set(null);
  }

  private speakNext(): void {
    if (!this.speech) {
      return;
    }
    if (this.cursor >= this.queue.length) {
      this.stop();
      return;
    }
    const chunk = this.queue[this.cursor];
    this.currentSegmentId.set(chunk.id);

    const utterance = new SpeechSynthesisUtterance(chunk.text);
    utterance.lang = this.voice ? this.voice.lang : "en";
    utterance.rate = 0.98;
    utterance.pitch = 1;
    if (this.voice) {
      utterance.voice = this.voice;
    }
    utterance.onend = () => {
      this.cursor += 1;
      this.speakNext();
    };
    utterance.onerror = (event) => {
      if (event.error === "interrupted" || event.error === "canceled") {
        return;
      }
      this.cursor += 1;
      this.speakNext();
    };
    this.activeUtterance = utterance;
    this.speech.speak(utterance);
  }

  private startWatchdog(): void {
    this.clearWatchdog();
    this.watchdogId = window.setInterval(() => {
      if (!this.isSpeaking() || this.isPaused()) {
        return;
      }
      if (this.speech && !this.speech.speaking) {
        this.speech.resume();
        window.setTimeout(() => {
          if (this.speech && !this.speech.speaking && this.isSpeaking() && this.activeUtterance) {
            this.speech.speak(this.activeUtterance);
          }
        }, 800);
      }
    }, 2500);
  }

  private clearWatchdog(): void {
    if (this.watchdogId !== null) {
      window.clearInterval(this.watchdogId);
      this.watchdogId = null;
    }
  }

  private pickVoice(): void {
    if (!this.speech) {
      return;
    }
    const voices = this.speech.getVoices();
    const english = voices.filter((v) =>
      v.lang.toLowerCase().startsWith("en"),
    );
    this.voice =
      english.find(
        (v) => v.name.includes("Natural") || v.name.includes("Premium"),
      ) ??
      english.find((v) => v.localService) ??
      english[0] ??
      null;
  }
}