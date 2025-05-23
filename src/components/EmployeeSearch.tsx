import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Edit, Trash2 } from 'lucide-react';
import { Employee } from '../types/Employee';
import { searchEmployeesByLastName, getEmployeesWithSalaryGreaterThan, getEmployeesHiredInYear, deleteEmployee } from '../services/employeeService';

const EmployeeSearch: React.FC = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<string>('lastName');
  const [lastNameQuery, setLastNameQuery] = useState<string>('');
  const [salaryQuery, setSalaryQuery] = useState<string>('');
  const [yearQuery, setYearQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState<boolean>(false);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setSearched(true);
    
    try {
      let results: Employee[] = [];
      
      switch (searchType) {
        case 'lastName':
          if (!lastNameQuery.trim()) {
            throw new Error('Please enter a last name to search');
          }
          results = await searchEmployeesByLastName(lastNameQuery);
          break;
        case 'salary':
          if (!salaryQuery.trim() || isNaN(parseFloat(salaryQuery))) {
            throw new Error('Please enter a valid salary amount');
          }
          results = await getEmployeesWithSalaryGreaterThan(parseFloat(salaryQuery));
          break;
        case 'hireYear':
          if (!yearQuery.trim() || isNaN(parseInt(yearQuery)) || yearQuery.length !== 4) {
            throw new Error('Please enter a valid 4-digit year');
          }
          results = await getEmployeesHiredInYear(parseInt(yearQuery));
          break;
        default:
          throw new Error('Invalid search type');
      }
      
      setSearchResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during search');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        setSearchResults(searchResults.filter(employee => employee.id !== id));
      } catch (err) {
        setError('Failed to delete employee. Please try again.');
        console.error('Error deleting employee:', err);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Search Employees</h2>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search Type</label>
          <div className="flex flex-wrap gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="searchType"
                value="lastName"
                checked={searchType === 'lastName'}
                onChange={() => setSearchType('lastName')}
                className="form-radio h-4 w-4 text-[#0A6ED1]"
              />
              <span className="ml-2">By Last Name</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="searchType"
                value="salary"
                checked={searchType === 'salary'}
                onChange={() => setSearchType('salary')}
                className="form-radio h-4 w-4 text-[#0A6ED1]"
              />
              <span className="ml-2">By Minimum Salary</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="searchType"
                value="hireYear"
                checked={searchType === 'hireYear'}
                onChange={() => setSearchType('hireYear')}
                className="form-radio h-4 w-4 text-[#0A6ED1]"
              />
              <span className="ml-2">By Hire Year</span>
            </label>
          </div>
        </div>
        
        <div className="mb-6">
          {searchType === 'lastName' && (
            <div>
              <label htmlFor="lastNameQuery" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastNameQuery"
                value={lastNameQuery}
                onChange={(e) => setLastNameQuery(e.target.value)}
                placeholder="Enter last name"
                className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}
          
          {searchType === 'salary' && (
            <div>
              <label htmlFor="salaryQuery" className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Salary
              </label>
              <input
                type="number"
                id="salaryQuery"
                value={salaryQuery}
                onChange={(e) => setSalaryQuery(e.target.value)}
                placeholder="Enter minimum salary"
                min="0"
                className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}
          
          {searchType === 'hireYear' && (
            <div>
              <label htmlFor="yearQuery" className="block text-sm font-medium text-gray-700 mb-1">
                Hire Year
              </label>
              <input
                type="number"
                id="yearQuery"
                value={yearQuery}
                onChange={(e) => setYearQuery(e.target.value)}
                placeholder="Enter 4-digit year (e.g., 2023)"
                min="1900"
                max="2100"
                className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}
        </div>
        
        <button
          onClick={handleSearch}
          disabled={loading}
          className={`bg-[#0A6ED1] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition-colors flex items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              Searching...
            </>
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              Search
            </>
          )}
        </button>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      
      {searched && !loading && !error && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Search Results ({searchResults.length})
            </h3>
          </div>
          
          {searchResults.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No employees found matching your search criteria.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hire Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {searchResults.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{employee.firstName} {employee.lastName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{employee.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{employee.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">${employee.salary?.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {employee.hireDate ? new Date(employee.hireDate).toLocaleDateString() : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => navigate(`/employees/edit/${employee.id}`)} 
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <Edit className="h-4 w-4 inline" />
                      </button>
                      <button 
                        onClick={() => handleDelete(employee.id)} 
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeSearch;