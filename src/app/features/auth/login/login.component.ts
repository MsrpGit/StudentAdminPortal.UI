import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  model: LoginRequest;

  constructor(private authservice: AuthService, private cookieService: CookieService, private router: Router) {
    this.model = {
      email: '',
      password: ''
    }
  }

  onFormSubmit(): void {
    this.authservice.login(this.model).subscribe({
      next: (response) => {
        // set auth cookie
        this.cookieService.set('Authorization', `Bearer${response.token}`,
          undefined, '/', undefined, true, 'Strict');

          this.authservice.setUser({
            email:response.email,
            roles:response.roles
          })

        // Redirect back to home
        this.router.navigateByUrl('/');
      }
    });

  }
}
