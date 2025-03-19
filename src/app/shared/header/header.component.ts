import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

/**
 * The header component of the application.
 * Provides navigation, language switching, and a responsive menu.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslatePipe, TranslateModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  currentLanguage: string = 'EN';
  isMenuOpen = false;

  /**
  * Initializes the HeaderComponent and sets up language change detection.
  * @param translate The translation service for handling language switching.
  */
  constructor(private translate: TranslateService, private router: Router) {
    this.currentLanguage = this.translate.currentLang?.toUpperCase() || 'EN';
    this.translate.onLangChange.subscribe((event) => {
      this.currentLanguage = event.lang.toUpperCase();
    });
  }

  /**
   * Toggles the language between English ('EN') and German ('DE').
   */
  toggleLanguage() {
    const newLang = this.currentLanguage === 'EN' ? 'de' : 'en';
    this.translate.use(newLang);
  }

  /**
   * Scrolls smoothly to the specified section on the page.
   * @param sectionId The ID of the section to scroll to.
   */
  scrollToSection(sectionId: string): void {
    const currentUrl = this.router.url;
    if (currentUrl === '/' || currentUrl === '/home') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      this.router.navigate(['/'], { queryParams: { section: sectionId } });
    }
  }

  /**
   * Toggles the mobile navigation menu and manages page scrolling behavior.
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;

    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}