import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';

/**
 * The footer component of the application.
 * Displays essential links and handles navigation behavior.
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslatePipe, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  email: string = 'kontakt@susanneborchardt.com';

  /**
   * Initializes the FooterComponent.
   * @param router The Angular Router for handling navigation.
   */
  constructor(private router: Router) { }

  /**
   * Lifecycle hook that runs when the component is initialized.
   * If the page is reloaded, navigates back to the home page.
   */
  ngOnInit(): void {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
      this.router.navigate(['/']);
    }
  }
}