import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, DollarSign, Building, CalendarDays } from 'lucide-react';
import { getAllEmployees } from '../services/employeeService';
import { Employee } from '../types/Employee';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [employeeCount, setEmployeeCount] = useState<number>(0);
  const [departments, setDepartments] = useState<string[]>([]);
  const [averageSalary, setAverageSalary] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const employees = await getAllEmployees();
        
        // Count of employees
        setEmployeeCount(employees.length);
        
        // Unique departments
        const uniqueDepartments = Array.from(new Set(
          employees.map(emp => emp.department).filter(Boolean)
        ));
        setDepartments(uniqueDepartments);
        
        // Average salary
        const totalSalary = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
        setAverageSalary(employees.length > 0 ? totalSalary / employees.length : 0);
        
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again later.');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0A6ED1]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Employee Count Card */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center border-l-4 border-[#0A6ED1]">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <Users className="h-6 w-6 text-[#0A6ED1]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Employees</p>
            <p className="text-2xl font-bold">{employeeCount}</p>
          </div>
        </div>
        
        {/* Departments Card */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center border-l-4 border-[#F80000]">
          <div className="rounded-full bg-red-100 p-3 mr-4">
            <Building className="h-6 w-6 text-[#F80000]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Departments</p>
            <p className="text-2xl font-bold">{departments.length}</p>
          </div>
        </div>
        
        {/* Average Salary Card */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center border-l-4 border-green-500">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <DollarSign className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Avg. Salary</p>
            <p className="text-2xl font-bold">${averageSalary.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
          </div>
        </div>
        
        {/* Current Date Card */}
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center border-l-4 border-purple-500">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <CalendarDays className="h-6 w-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Date</p>
            <p className="text-2xl font-bold">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
      
      {employeeCount === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Welcome to the Oracle JPA Application</h3>
          <p className="text-gray-600 mb-6">No employees have been added yet. Get started by adding your first employee.</p>
          <button
            onClick={() => navigate('/employees/new')}
            className="bg-[#0A6ED1] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition-colors"
          >
            Add First Employee
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Department Distribution</h3>
            <div className="space-y-4">
              {departments.map((dept, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{dept}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#0A6ED1] h-2.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              ))}
              {departments.length === 0 && (
                <p className="text-gray-500 text-center py-4">No department data available</p>
              )}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => navigate('/employees')}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded shadow transition-colors flex items-center justify-center"
              >
                <Users className="h-4 w-4 mr-2" />
                View All Employees
              </button>
              <button 
                onClick={() => navigate('/employees/new')}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded shadow transition-colors flex items-center justify-center"
              >
                <Users className="h-4 w-4 mr-2" />
                Add New Employee
              </button>
              <button 
                onClick={() => navigate('/employees/search')}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded shadow transition-colors flex items-center justify-center"
              >
                <Users className="h-4 w-4 mr-2" />
                Search Employees
              </button>
              <button 
                onClick={() => window.open('https://docs.oracle.com/en/database/', '_blank')}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded shadow transition-colors flex items-center justify-center"
              >
                <Users className="h-4 w-4 mr-2" />
                Oracle Documentation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;