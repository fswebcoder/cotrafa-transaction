import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'cf-products-summary-header',
  imports: [ButtonModule],
  templateUrl: './products-summary-header.html',
  styleUrl: './products-summary-header.scss',
})
export class ProductsSummaryHeader {
  depositDisabled = input<boolean>(false);

  depositClick = output<void>();
}

