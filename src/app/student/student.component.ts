import { Component } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  selectedpinnumber: string = '';
  serverurl: string = "https://college-attendance-system-backend.vercel.app/"
  attendancereport: any;


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
}
