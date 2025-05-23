import axios from 'axios';
import { Employee } from '../types/Employee';

const API_URL = 'http://localhost:8080/api/employees';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all employees
export const getAllEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await api.get('');
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

// Get a single employee by ID
export const getEmployeeById = async (id: number): Promise<Employee> => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employee with ID ${id}:`, error);
    throw error;
  }
};

// Create a new employee
export const createEmployee = async (employee: Employee): Promise<Employee> => {
  try {
    const response = await api.post('', employee);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

// Update an existing employee
export const updateEmployee = async (id: number, employee: Employee): Promise<Employee> => {
  try {
    const response = await api.put(`/${id}`, employee);
    return response.data;
  } catch (error) {
    console.error(`Error updating employee with ID ${id}:`, error);
    throw error;
  }
};

// Delete an employee
export const deleteEmployee = async (id: number): Promise<void> => {
  try {
    await api.delete(`/${id}`);
  } catch (error) {
    console.error(`Error deleting employee with ID ${id}:`, error);
    throw error;
  }
};

// Search employees by last name
export const searchEmployeesByLastName = async (lastName: string): Promise<Employee[]> => {
  try {
    const response = await api.get(`/search?lastName=${lastName}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching employees by last name "${lastName}":`, error);
    throw error;
  }
};

// Get employees with salary greater than a minimum value
export const getEmployeesWithSalaryGreaterThan = async (minSalary: number): Promise<Employee[]> => {
  try {
    const response = await api.get(`/salary?minSalary=${minSalary}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employees with salary greater than ${minSalary}:`, error);
    throw error;
  }
};

// Get employees hired in a specific year
export const getEmployeesHiredInYear = async (year: number): Promise<Employee[]> => {
  try {
    const response = await api.get(`/hired-in-year?year=${year}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employees hired in year ${year}:`, error);
    throw error;
  }
};

// Get employees by department
export const getEmployeesByDepartment = async (department: string): Promise<Employee[]> => {
  try {
    const response = await api.get(`/department/${department}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching employees in department "${department}":`, error);
    throw error;
  }
};