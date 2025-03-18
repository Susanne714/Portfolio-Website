import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * A reusable button component that supports different styles,
 * links, and states.
 */
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `<button [disabled]="disabled">{{ label }}</button>`,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent {
  @Input() label: string = 'Button'
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Input() link: string | null = null;
  @Input() showArrow: boolean = false;
  @Input() disabled: boolean | null = null;
  @Input() disableHover: boolean = false;

  /**
   * Handles button clicks. If a link is provided, navigates to it.
   */
  handleClick(): void {
    if (this.link) {
      window.location.href = this.link;
    }
  }
}