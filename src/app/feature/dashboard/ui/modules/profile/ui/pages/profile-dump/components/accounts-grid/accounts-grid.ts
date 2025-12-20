import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { IAccount } from '@app/shared/entities/accounts.entity';

@Component({
  selector: 'cf-accounts-grid',
  imports: [CommonModule, SkeletonModule, TooltipModule],
  templateUrl: './accounts-grid.html',
  styleUrl: './accounts-grid.scss',
})
export class AccountsGrid {
  accounts = input<IAccount[] | null>(null);
}

