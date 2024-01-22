export class StudentData {
    PinNumber: string="";
    StudentName: string = "";
    Department: string = "";
    Year:string="";
    Section:string="";
    ParentPhoneNumber!:number;
}

export class StudentsData {
    studentData : StudentData[] = [];
}
export class StudentAttendance {
    PinNumber :string = "";
    Date:string = "";
    AttendanceStatus:boolean = false;
}
export interface User {
    username: string;
    password: string;
    role: string;
  }
  