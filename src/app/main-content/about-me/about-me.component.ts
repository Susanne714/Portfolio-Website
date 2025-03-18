import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * The AboutMeComponent represents the ‘About me’ section of the website.
 * It displays information about the person and uses the TranslatePipe for internationalisation.
 */
@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})

export class AboutMeComponent {

}