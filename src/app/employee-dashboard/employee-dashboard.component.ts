import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { employeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj: employeeModel = new employeeModel();
  allEmployeeData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder, private api: ApiService) {

  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      mobilenumber: [''],
      salary: ['']
    });
    this.getAllEmployee();
  }

  postEmployeeDetails() {
    this.employeeModelObj.firstname = this.formValue.value.firstname;
    this.employeeModelObj.lastname = this.formValue.value.lastname;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobilenumber = this.formValue.value.mobilenumber;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModelObj).subscribe(res => {
      console.log(res);
      alert("employee added successfully...");
      let cancel = document.getElementById("cancel");
      cancel?.click();
      this.formValue.reset();
      this.getAllEmployee();

    },
      err => {
        alert("something went wrong..");
      })
  }

  getAllEmployee() {
    this.api.getEmployee().subscribe(res => {
      this.allEmployeeData = res;
      console.log(this.allEmployeeData);
    })
  }

  employeeDelete(data: any) {
    console.log("deleted")
    this.api.deleteEmployee(data.id).subscribe(res => {
      alert("employee Deleted" + data.id);
      this.getAllEmployee();
    });
  }

  onEdit(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = data.id;
    this.formValue.controls['firstname'].setValue(data.firstname);
    this.formValue.controls['lastname'].setValue(data.lastname);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobilenumber'].setValue(data.mobilenumber);
    this.formValue.controls['salary'].setValue(data.salary);
  }

  employeeUpdate() {
    this.employeeModelObj.firstname = this.formValue.value.firstname;
    this.employeeModelObj.lastname = this.formValue.value.lastname;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobilenumber = this.formValue.value.mobilenumber;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id).subscribe(res => {
      alert("updated successfully");

      let cancel = document.getElementById("cancel");
      cancel?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
}
