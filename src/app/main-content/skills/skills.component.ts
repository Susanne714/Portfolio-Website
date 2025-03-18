import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Component for displaying the skills section of the portfolio.
 * It includes a button to navigate smoothly to another section.
 */
@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ButtonComponent, TranslatePipe],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})

export class SkillsComponent {
  /**
   * Scrolls smoothly to a specific section of the page.
   * 
   * @param sectionId - The ID of the target section to scroll to.
   */
  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}