package com.example.oraclejpaapp.repository;

import com.example.oraclejpaapp.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    
    List<Employee> findByDepartment(String department);
    
    List<Employee> findByLastNameContainingIgnoreCase(String lastName);
    
    @Query("SELECT e FROM Employee e WHERE e.salary >= :minSalary")
    List<Employee> findEmployeesWithSalaryGreaterThan(BigDecimal minSalary);
    
    @Query(value = "SELECT * FROM EMPLOYEES e WHERE EXTRACT(YEAR FROM e.HIRE_DATE) = :year", nativeQuery = true)
    List<Employee> findEmployeesHiredInYear(int year);
}