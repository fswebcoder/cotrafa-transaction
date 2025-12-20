import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HttpLoadingService } from '@app/core/services/http-loading.service';

@Component({
  selector: 'cf-loading-overlay',
  imports: [CommonModule, ProgressSpinnerModule],
  templateUrl: './loading-overlay.html',
  styleUrl: './loading-overlay.scss',
})
export class LoadingOverlay {
  private httpLoading = inject(HttpLoadingService);

  loading = this.httpLoading.loading;
  message = this.httpLoading.message;
}

