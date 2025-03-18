import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * The HeroComponent represents the introduction section of the portfolio.
 * It includes a call-to-action button and a smooth scrolling function
 * to navigate to different sections of the page.
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TranslatePipe],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})

export class HeroComponent {
  email: string = 'kontakt@susanneborchardt.com';

  /**
  * Smoothly scrolls the page to the specified section.
  * 
  * @param sectionId - The ID of the section to scroll to.
  */
  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}