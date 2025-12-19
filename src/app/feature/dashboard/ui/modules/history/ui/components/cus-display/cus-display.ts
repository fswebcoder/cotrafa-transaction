import { Component, computed, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CusEncryptionService } from '@app/core/services/cus-encryption.service';

@Component({
  selector: 'cf-cus-display',
  standalone: true,
  imports: [CommonModule, ButtonModule, TooltipModule],
  templateUrl: './cus-display.html',
  styles: [`
    :host {
      display: block;
      min-width: 150px;
    }
    .cus-text {
      font-family: monospace;
      font-size: 0.875rem;
    }
  `]
})
export class CusDisplay {
  private cusService = inject(CusEncryptionService);

  cus = input.required<string>();
  encryptedCus = input<string | null>(null);

  showOriginal = signal(false);
  copied = signal(false);

  protectedCus = computed(() => this.encryptedCus() ?? this.cusService.encrypt(this.cus()));

  toggleVisibility() {
    this.showOriginal.update(v => !v);
  }

  async copyToClipboard() {
    const textToCopy = this.showOriginal() ? this.cus() : this.protectedCus();
    try {
      await navigator.clipboard.writeText(textToCopy);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
}
