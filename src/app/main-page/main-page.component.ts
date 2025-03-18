import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../main-content/hero/hero.component';
import { AboutMeComponent } from '../main-content/about-me/about-me.component';
import { SkillsComponent } from '../main-content/skills/skills.component';
import { ProjectsComponent } from '../main-content/projects/projects.component';
import { CommentsComponent } from '../main-content/comments/comments.component';
import { ContactComponent } from '../main-content/contact/contact.component';

/**
 * The main page component that serves as the container
 * for all major sections of the portfolio.
 */
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, HeroComponent, AboutMeComponent, SkillsComponent, ProjectsComponent, CommentsComponent, ContactComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent {

}