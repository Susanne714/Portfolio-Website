import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Meta } from '@angular/platform-browser';

/**
 * The Privacy Policy component.
 * Displays the privacy policy (Datenschutzerklärung) of the website and sets SEO-related meta tags.
 */
@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})

export class PrivacyPolicyComponent {
  /**
  * Constructor that updates the meta tag to prevent search engines from indexing the page.
  * @param meta The Meta service for managing meta tags.
  */
  constructor(private meta: Meta) {
    this.meta.updateTag({ name: 'robots', content: 'noindex, follow' });
  }
}