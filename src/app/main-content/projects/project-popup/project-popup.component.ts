import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ProjectData } from '../project-data.model';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Component for displaying a project popup with details and actions.
 */
@Component({
  selector: 'app-project-popup',
  standalone: true,
  imports: [ButtonComponent, CommonModule, TranslatePipe],
  templateUrl: './project-popup.component.html',
  styleUrls: ['./project-popup.component.scss']
})

export class ProjectPopupComponent {
  @Input() project: ProjectData | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  /**
   * Closes the popup by emitting the close event.
   */
  closePopup() {
    this.close.emit();
  }

  /**
   * Stops event propagation when clicking inside the card.
   * @param event The click event.
   */
  onCardClick(event: Event) {
    event.stopPropagation();
  }

  /**
   * Opens a given URL in a new tab if it exists.
   * @param url The URL to open.
   */
  openLink(url: string | undefined) {
    if (url) {
      window.open(url, '_blank');
    }
  }

  /**
   * Emits the next event to trigger the next project display.
   */
  triggerNextProject() {
    this.next.emit();
  }
}