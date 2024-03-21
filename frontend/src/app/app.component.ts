import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  employees: Employee[] = [];
  newEmployee: Employee = {} as Employee;
  addingNew: boolean = false;
  errorMessage: string = '';
  editingEmployee: Employee | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
      },
      error: (error: any) => {
        this.errorMessage = 'An error occurred while fetching employees.';
      },
    });
  }

  addNewEmployee() {
    this.employeeService.addEmployee(this.newEmployee).subscribe({
      next: (data: Employee) => {
        this.employees.push(data);
        this.newEmployee = {} as Employee;
        this.addingNew = false;
      },
      error: (error) => {
        this.errorMessage = 'An error occurred while adding the employee.';
      },
    });
  }

  toggleAdding() {
    this.addingNew = !this.addingNew;
  }

  cancelAdding() {
    this.addingNew = false;
    this.newEmployee = {} as Employee;
  }

  editEmployee(employee: Employee) {
    this.editingEmployee = { ...employee };
  }

  cancelEditing() {
    this.editingEmployee = null;
  }

  saveEmployeeChanges() {
    if (this.editingEmployee) {
      this.employeeService.updateEmployee(this.editingEmployee).subscribe({
        next: (data: Employee) => {
          const index = this.employees.findIndex((emp) => emp.id === data.id);
          if (index !== -1) {
            this.employees[index] = { ...data };
          }
          this.editingEmployee = null;
        },
        error: (error) => {
          this.errorMessage = 'An error occurred while saving changes.';
        },
      });
    }
  }

  deleteEmployee(employeeId: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employeeId).subscribe({
        next: () => {
          this.employees = this.employees.filter(
            (emp) => emp.id !== employeeId
          );
        },
        error: (error) => {
          this.errorMessage = 'An error occurred while deleting the employee.';
        },
      });
    }
  }
}
