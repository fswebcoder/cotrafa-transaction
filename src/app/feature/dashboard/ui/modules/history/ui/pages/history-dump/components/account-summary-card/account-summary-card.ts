import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { IUser } from '@app/shared/entities/user.entity';

@Component({
  selector: 'cf-account-summary-card',
  imports: [CommonModule, CardModule, SkeletonModule],
  templateUrl: './account-summary-card.html',
  styleUrl: './account-summary-card.scss',
})
export class AccountSummaryCard {
  user = input<IUser | null>(null);
}

 