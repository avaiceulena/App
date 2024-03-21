package com.agnese.EmployeeManagerApp.repository;

import com.agnese.EmployeeManagerApp.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    void deleteEmployeeById(Long id);

    Employee findEmployeeById(Long id);
}
