import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { TooltipModule } from 'primeng/tooltip';
import { IUser } from '@app/shared/entities/user.entity';

@Component({
  selector: 'cf-profile-dump',
  imports: [CommonModule, CardModule, ButtonModule, SkeletonModule, DividerModule, ChipModule, TooltipModule],
  templateUrl: './profile-dump.html',
  styleUrl: './profile-dump.scss',
})
export class ProfileDump {
  user = input<IUser | null>(null);
}
