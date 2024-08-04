import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsernameService } from '../services/username.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  selectedpinnumber: string = '';
  serverurl: string = "https://college-attendance-system-backend.vercel.app/"
  attendancereport: any;
  studentdata: any
  sd: any;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private usernameService: UsernameService) { }
  ngOnInit() {
    this.selectedpinnumber = this.usernameService.getUsername();
    this.getattendancereport();
    this.getStudentDetails();
    if (!this.selectedpinnumber) {
      this.logout();
    }
  }
  getStudentDetails() {
    let requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow"
    };

    fetch(this.serverurl + "students/" + this.selectedpinnumber, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        this.studentdata = JSON.parse(result);
        this.sd = this.studentdata[0];
        console.log(this.sd, "single");
      })
      .catch(error => console.log('error', error));
  }

  getattendancereport = () => {
    let requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow"
    };

    fetch(this.serverurl + "studentattendancereport/" + this.selectedpinnumber, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        this.attendancereport = JSON.parse(result);
        var percent = (this.attendancereport.DaysPresent / this.attendancereport.DaysTotal) * 100;
        this.attendancereport['AttendancePercent'] = percent.toFixed(2);
        console.log(this.attendancereport, "Updtaed")
        console.log(percent)
      })
      .catch(error => console.log('error', error));
  }

  logout() {
    this.authService.logout();
    alert("Logging out...")
    this.router.navigate(['/login']);
  }
}
