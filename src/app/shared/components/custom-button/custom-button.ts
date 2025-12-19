import { Component, computed, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'cf-custom-button',
  imports: [ButtonModule],
  templateUrl: './custom-button.html',
  styleUrl: './custom-button.scss',
})
export class CustomButton {
  label = input<string>('');
  icon = input<string | undefined>(undefined);
  loading = input<boolean>(false);
  variant = input<'primary' | 'secondary' | 'white'>('primary');
  type = input<'button' | 'submit' | 'reset'>('button');
  disabled = input<boolean>(false);
  fullWidth = input<boolean>(false);

  onClick = output<Event>();

  severity = computed(() => {
    switch (this.variant()) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'secondary';
      case 'white':
        return 'secondary';
      default:
        return 'primary';
    }
  });

  isOutlined = computed(() => this.variant() === 'white');
}
