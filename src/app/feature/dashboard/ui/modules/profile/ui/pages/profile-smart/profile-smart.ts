import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileDump } from '../profile-dump/profile-dump';
import { selectUser } from '@app/core/state/auth/auth.selectors';

@Component({
  selector: 'cf-profile-smart',
  imports: [ProfileDump],
  templateUrl: './profile-smart.html',
  styleUrl: './profile-smart.scss',
})
export class ProfileSmart {
  private store = inject(Store);
  user = this.store.selectSignal(selectUser);
}
