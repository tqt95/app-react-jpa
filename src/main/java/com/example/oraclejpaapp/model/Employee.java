package com.example.oraclejpaapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "EMPLOYEES")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "emp_seq")
    @SequenceGenerator(name = "emp_seq", sequenceName = "EMPLOYEE_SEQ", allocationSize = 1)
    private Long id;
    
    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name cannot exceed 50 characters")
    @Column(name = "FIRST_NAME", length = 50, nullable = false)
    private String firstName;
    
    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name cannot exceed 50 characters")
    @Column(name = "LAST_NAME", length = 50, nullable = false)
    private String lastName;
    
    @Email(message = "Email should be valid")
    @Column(name = "EMAIL", unique = true)
    private String email;
    
    @Column(name = "PHONE_NUMBER")
    private String phoneNumber;
    
    @Column(name = "HIRE_DATE")
    private LocalDate hireDate;
    
    @Column(name = "SALARY", precision = 10, scale = 2)
    private BigDecimal salary;
    
    @Column(name = "DEPARTMENT")
    private String department;
}