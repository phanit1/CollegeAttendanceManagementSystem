// register.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router: Router, private authService: AuthService) {}

  register(registerForm: NgForm) {
    if (registerForm) {
      const { username, password, role } = registerForm.value;

      this.authService.register(username, password, role).subscribe(
        () => {
          this.router.navigate(['/login']);
          alert('Registration successfull. Please login.');
        },
        (error) => {
          console.error('Registration failed:', error);
          alert(error.error.message);
        }
      );
    }
  }
}
