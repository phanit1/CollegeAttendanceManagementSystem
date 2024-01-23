import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  selectedpinnumber: string = '';
  serverurl: string = "https://college-attendance-system-backend.vercel.app/"
  attendancereport: any;

  constructor(private authService: AuthService,private router: Router) {}

  getattendancereport() {
    let requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow"
    };

    fetch(this.serverurl+"studentattendancereport/" + this.selectedpinnumber, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        this.attendancereport = JSON.parse(result);
      })
      .catch(error => console.log('error', error));
  }
  logout() {
    this.authService.logout();
    alert("Logging out...")
    this.router.navigate(['/login']);
  }
}
