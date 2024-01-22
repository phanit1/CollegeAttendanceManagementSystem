import { Component } from '@angular/core';
import * as xlsx from 'xlsx';
import { StudentData, StudentsData, StudentAttendance } from './model';
// import excelfile from "../../SampleRecords.xlsx"
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
