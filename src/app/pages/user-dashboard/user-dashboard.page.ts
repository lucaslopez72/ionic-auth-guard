import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss']
})
export class UserDashboardPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  readonly currentSession = this.auth.currentUser;

  handleLogout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}