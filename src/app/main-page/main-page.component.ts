import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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

export class MainPageComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const section = params['section'];
      if (section) {
        setTimeout(() => {
          const el = document.getElementById(section);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 0);
      }
    });
  }
}