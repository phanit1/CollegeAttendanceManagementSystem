// login.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login', // This selector is necessary for Angular to recognize it as a component
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  login(loginForm: NgForm) {
    if (loginForm) {
      const { username, password } = loginForm.value;

      this.authService.login(username, password).subscribe(
        (user) => {
          // Assuming the server returns the user's role
          if (user.role === 'admin') {
            this.router.navigate(['/admin']);
            alert('Logging in as admin');
          } else if (user.role === 'student') {
            this.router.navigate(['/student']);
            alert('Logging in as student');
          } else {
            alert('Invalid credentials');
          }
        },
        (error) => {
          console.error('Login failed:', error);
          alert('Login failed. Please try again.');
        }
      );
    }
  }
}
