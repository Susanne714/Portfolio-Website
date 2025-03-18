import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Meta } from '@angular/platform-browser';

/**
 * The Legal Notice component.
 * Displays the legal notice (Impressum) of the website and sets SEO-related meta tags.
 */
@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './legal-notice.component.html',
  styleUrls: ['./legal-notice.component.scss'],
})

export class LegalNoticeComponent {
  /**
   * Constructor that updates the meta tag to prevent search engines from indexing the page.
   * @param meta The Meta service for managing meta tags.
   */
  constructor(private meta: Meta) {
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
  }
}