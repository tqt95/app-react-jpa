import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Database, Users, UserPlus, Search, Home } from 'lucide-react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EmployeeSearch from './components/EmployeeSearch';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-4 bg-[#0A6ED1] text-white">
            <div className="flex items-center">
              <Database className="h-6 w-6 mr-2" />
              <h1 className="text-xl font-semibold">Oracle JPA App</h1>
            </div>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  <Home className="h-5 w-5 mr-3" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/employees" 
                  className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  <Users className="h-5 w-5 mr-3" />
                  Employees
                </Link>
              </li>
              <li>
                <Link 
                  to="/employees/new" 
                  className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  <UserPlus className="h-5 w-5 mr-3" />
                  Add Employee
                </Link>
              </li>
              <li>
                <Link 
                  to="/employees/search" 
                  className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  <Search className="h-5 w-5 mr-3" />
                  Search
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/employees/new" element={<EmployeeForm />} />
            <Route path="/employees/edit/:id" element={<EmployeeForm />} />
            <Route path="/employees/search" element={<EmployeeSearch />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;