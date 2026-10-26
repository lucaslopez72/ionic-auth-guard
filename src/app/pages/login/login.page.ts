import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonText
} from '@ionic/angular';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonText
  ]
})
export class LoginPage {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  errorMessage = '';

  handleLogin(): void {
    this.errorMessage = '';

    if (this.auth.login(this.username, this.password)) {
      const destination = this.auth.currentUser()?.role === 'admin'
        ? '/admin'
        : '/user-dashboard';
      this.router.navigate([destination]);
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos.';
    }
  }
}