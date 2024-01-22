import { Component } from '@angular/core';
import { StudentAttendance, StudentsData } from '../model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  title = 'Welcome to the College Attendance Management System';
  exceldata: StudentsData[] = [];
  selectedDepartment: string = '';
  selectedYear: string = '';
  selectedSection: string = '';
  selectedpinnumber: string = '';
  selectpinnumber: string = '';
  attendancereport: any;
  studentsdata: any;
  currentDate:any;
  attendancestatus: boolean = false;
  studattend: StudentAttendance[] = [];
  serverurl: string = "https://college-attendance-system-backend.vercel.app/"
  constructor(private datePipe: DatePipe) {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy/MM/dd');
  }
  ngOnInit() {
  }
 
  // getattendancereport() {
  //   let requestOptions: RequestInit = {
  //     method: "GET",
  //     redirect: "follow"
  //   };

  //   fetch(this.serverurl+"studentattendancereport/" + this.selectedpinnumber, requestOptions)
  //     .then(response => response.text())
  //     .then(result => {
  //       console.log(result);
  //       this.attendancereport = JSON.parse(result);
  //     })
  //     .catch(error => console.log('error', error));
  // }

  submitForm() {
    let requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow"
    };

    fetch(this.serverurl+"students/" + this.selectedYear + "/" + this.selectedSection + "/" + this.selectedDepartment, requestOptions)
      .then(response => response.text())
      .then(result => {
        // console.log(result);
        if(result != "No Student Data Found") {
          this.studentsdata = JSON.parse(result);
        }
        else {
          this.studentsdata = result;
        }
        this.studattend = []
        this.default_attendance()
      })
      .catch(error => console.log('error', error));
  }

  default_attendance() {
    this.studentsdata.forEach((student:any) => {
      let studattendobj = new StudentAttendance();
      studattendobj.PinNumber = student.PinNumber;
      studattendobj.Date = this.currentDate;
      studattendobj.AttendanceStatus = false;
      this.studattend.push(studattendobj);
    });
    console.log(this.studattend,"default")
  }

  updateOrAddEntry(data: any[], newEntry: any): any[] {
    const updatedData: any[] = [];
    let updated = false;

    data.forEach(entry => {
      if (entry.PinNumber === newEntry.PinNumber && entry.Date === newEntry.Date) {
        // Update the previous entry
        updatedData.push(newEntry);
        updated = true;
      } else {
        updatedData.push(entry);
      }
    });

    // If not updated, add the new entry
    if (!updated) {
      updatedData.push(newEntry);
    }
    console.log(updatedData)
    return updatedData;
  }

  mark_attendance(pinno: string, event: any) {
    // console.log(this.studentsdata,"StudData")
    let studattendobj = new StudentAttendance();
    studattendobj.PinNumber = pinno;
    studattendobj.Date = this.currentDate;
    studattendobj.AttendanceStatus = event.srcElement.checked;
    this.studattend = this.updateOrAddEntry(this.studattend, studattendobj);
    
  }
  sendAttendance() {
var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(this.studattend);

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(this.serverurl+"poststudentsattendance", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  }
  generateattendancereport() {
    console.log("attendance report generated")
  }
}
