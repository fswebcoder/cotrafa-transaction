import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { IUser } from '@app/shared/entities/user.entity';

@Component({
  selector: 'cf-profile-summary-card',
  imports: [CommonModule, CardModule, SkeletonModule, DividerModule, ChipModule],
  templateUrl: './profile-summary-card.html',
  styleUrl: './profile-summary-card.scss',
})
export class ProfileSummaryCard {
  user = input<IUser | null>(null);
}

