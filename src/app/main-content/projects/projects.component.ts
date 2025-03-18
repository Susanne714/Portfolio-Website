import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectPopupComponent } from './project-popup/project-popup.component';
import { ProjectData } from './project-data.model';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Component that displays a list of projects with preview images
 * and provides a popup view for detailed project information.
 */
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectPopupComponent, TranslatePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})

export class ProjectsComponent {
  hoveredProject: any = null;

  /**
   * Contains a preview list of projects with minimal information.
   */
  previewProjectData = [
    { title: 'Join', techs: ['HTML', 'CSS', 'JavaScript', 'Firebase'], image: '../../../assets/img/project_join3.png', top: '0px' },
    { title: 'El Pollo Loco', techs: ['HTML', 'CSS', 'JavaScript'], image: '../../../assets/img/project_el_pollo_loco1.png', top: '-120px' },
    { title: 'Pokédex', techs: ['HTML', 'CSS', 'JavaScript', 'Rest-API'], image: '../../../assets/img/project_pokedex1.png', top: '-240px' }
  ];

  /**
   * List of projects with detailed information including technologies,
   * preview images, GitHub links, and live demo links.
   */
  projectList: ProjectData[] = [
    {
      number: '01',
      title: 'Join',
      descriptionKey: 'projects.join.description',
      techs: [
        { name: 'CSS', icon: '../../../../assets/img/icon_css_green.png' },
        { name: 'HTML', icon: '../../../../assets/img/icon_html_green.png' },
        { name: 'Firebase', icon: '../../../../assets/img/icon_firebase_green.png' },
        { name: 'JavaScript', icon: '../../../../assets/img/icon_javascript_green.png' }
      ],
      image: '../../../../assets/img/project_join3.png',
      githubLink: 'https://github.com/Susanne714/Join',
      liveLink: 'https://join.susanneborchardt.com/'
    },
    {
      number: '02',
      title: 'El Pollo Loco',
      descriptionKey: 'projects.el_pollo_loco.description',
      techs: [
        { name: 'CSS', icon: '../../../../assets/img/icon_css_green.png' },
        { name: 'HTML', icon: '../../../../assets/img/icon_html_green.png' },
        { name: 'JavaScript', icon: '../../../../assets/img/icon_javascript_green.png' }
      ],
      image: '../../../../assets/img/project_el_pollo_loco2.png',
      githubLink: 'https://github.com/Susanne714/El_Pollo_Loco',
      liveLink: 'http://el-pollo-loco.susanneborchardt.com/'
    },
    {
      number: '03',
      title: 'Pokédex',
      descriptionKey: 'projects.pokedex.description',
      techs: [
        { name: 'CSS', icon: '../../../../assets/img/icon_css_green.png' },
        { name: 'HTML', icon: '../../../../assets/img/icon_html_green.png' },
        { name: 'JavaScript', icon: '../../../../assets/img/icon_javascript_green.png' },
        { name: 'Rest-API', icon: '../../../../assets/img/icon_rest_api_green.png' }
      ],
      image: '../../../../assets/img/project_pokedex2.png',
      githubLink: 'https://github.com/Susanne714/Pokedex',
      liveLink: 'https://pokedex.susanneborchardt.com/'
    }
  ];

  /**
  * Stores the currently selected project for display in the popup.
  */
  selectedProject: ProjectData | null = null;

  /**
   * Opens the project popup for the given project title.
   * 
   * @param projectTitle - The title of the project to display in the popup.
   */
  openProjectPopup(projectTitle: string) {
    const project = this.projectList.find(p => p.title === projectTitle);
    if (project) {
      this.selectedProject = project;
      document.body.style.overflow = 'hidden';
    }
  }

  /**
   * Closes the currently open project popup.
   */
  closeProjectPopup() {
    this.selectedProject = null;
    document.body.style.overflow = 'auto';
  }

  /**
   * Displays the next project in the list when navigating through the popup.
   */
  nextProject() {
    if (this.selectedProject && this.projectList.length > 1) {
      let currentIndex = this.projectList.findIndex(p => p.title === this.selectedProject?.title);
      let nextIndex = (currentIndex + 1) % this.projectList.length;
      this.selectedProject = this.projectList[nextIndex];
    }
  }
}