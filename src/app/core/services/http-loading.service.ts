import { Injectable, computed, signal } from '@angular/core';

type ActiveRequest = {
  key: number;
  label: string;
};

@Injectable({
  providedIn: 'root',
})
export class HttpLoadingService {
  private nextKey = 1;
  private activeRequests = signal<ActiveRequest[]>([]);

  loading = computed(() => this.activeRequests().length > 0);
  message = computed(() => this.activeRequests().at(-1)?.label ?? null);

  start(label: string): number {
    const key = this.nextKey++;
    this.activeRequests.update((current) => [...current, { key, label }]);
    return key;
  }

  stop(key: number) {
    this.activeRequests.update((current) => current.filter((r) => r.key !== key));
  }
}

