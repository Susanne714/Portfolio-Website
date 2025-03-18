import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LegalNoticeComponent } from './shared/legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './shared/privacy-policy/privacy-policy.component';

/**
 * Application routes configuration.
 * Defines navigation paths and their corresponding components.
 */
export const routes: Routes = [
    { path: '', component: MainPageComponent, pathMatch: 'full' },
    { path: 'legalNotice', component: LegalNoticeComponent },
    { path: 'privacyPolicy', component: PrivacyPolicyComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];