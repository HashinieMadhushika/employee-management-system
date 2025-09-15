import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Dashboard.css';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('employees');
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showUpdateEmployeeModal, setShowUpdateEmployeeModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: 'Engineering'
  });
  const [updateEmployee, setUpdateEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    department: 'Engineering',
    status: 'ACTIVE'
  });
  const [userType, setUserType] = useState('employee');
  const [employees, setEmployees] = useState([
    {
      id: 1,
      initials: 'JD',
      firstName: 'John',
      lastName: 'Dale',
      email: 'john@example.com',
      position: 'Financial Developer',
      department: 'Engineering',
      status: 'ACTIVE',
      selected: false
    },
    {
      id: 2,
      initials: 'JS',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      position: 'UI/UX Designer',
      department: 'Design',
      status: 'ACTIVE',
      selected: false
    },
    {
      id: 3,
      initials: 'MJ',
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike@example.com',
      position: 'Business Developer',
      department: 'Engineering',
      status: 'ON-LEAVE',
      selected: false
    },
    {
      id: 4,
      initials: 'SW',
      firstName: 'Sarah',
      lastName: 'Williams',
      email: 'sarah@example.com',
      position: 'Product Manager',
      department: 'Product',
      status: 'ACTIVE',
      selected: false
    },
    {
      id: 5,
      initials: 'AB',
      firstName: 'Alex',
      lastName: 'Brown',
      email: 'alex@example.com',
      position: 'QA Engineer',
      department: 'Engineering',
      status: 'ACTIVE',
      selected: false
    }
  ]);
  const navigate = useNavigate();

  const isAdmin = userType === 'administrator';

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check user role on component mount
  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch employees from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/employees', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setEmployees(data.map(emp => ({
            ...emp,
            initials: emp.firstName.charAt(0) + emp.lastName.charAt(0),
            selected: false
          })));
        } else {
          console.error('Failed to fetch employees');
          // Keep the dummy data as fallback for demo
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(employee =>
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value
    });
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateEmployee({
      ...updateEmployee,
      [name]: value
    });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    
    if (!newEmployee.firstName || !newEmployee.lastName || !newEmployee.email || !newEmployee.position || !newEmployee.department) {
      alert('Please fill in all required fields');
      return;
    }

    // Email validation
    if (!isValidEmail(newEmployee.email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Check for duplicate email
    if (employees.some(emp => emp.email.toLowerCase() === newEmployee.email.toLowerCase())) {
      alert('An employee with this email already exists');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: newEmployee.firstName,
          lastName: newEmployee.lastName,
          email: newEmployee.email,
          position: newEmployee.position,
          department: newEmployee.department,
          status: 'ACTIVE'
        })
      });

      if (response.ok) {
        const employee = await response.json();
        
        // Add to local state with initials
        setEmployees(prev => [{
          ...employee,
          initials: employee.firstName.charAt(0) + employee.lastName.charAt(0),
          selected: false
        }, ...prev]);
        
        // Reset form and close modal
        setNewEmployee({
          firstName: '',
          lastName: '',
          email: '',
          position: '',
          department: 'Engineering'
        });
        setShowAddEmployeeModal(false);
        
        // Show success message
        alert('Employee added successfully!');
      } else {
        alert('Failed to add employee');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Error adding employee');
    }
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setUpdateEmployee({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      position: employee.position,
      department: employee.department,
      status: employee.status
    });
    setShowUpdateEmployeeModal(true);
  };

  const handleUpdateEmployee = async (e) => {
    e.preventDefault();
    
    if (!updateEmployee.firstName || !updateEmployee.lastName || !updateEmployee.email || !updateEmployee.position || !updateEmployee.department) {
      alert('Please fill in all required fields');
      return;
    }

    // Email validation
    if (!isValidEmail(updateEmployee.email)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/employees/${selectedEmployee.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateEmployee)
      });

      if (response.ok) {
        const updatedEmp = await response.json();
        
        // Update employee in the array
        const updatedEmployees = employees.map(emp =>
          emp.id === selectedEmployee.id
            ? {
                ...updatedEmp,
                initials: updatedEmp.firstName.charAt(0) + updatedEmp.lastName.charAt(0),
                selected: emp.selected
              }
            : emp
        );

        setEmployees(updatedEmployees);
        setShowUpdateEmployeeModal(false);
        setSelectedEmployee(null);
        
        // Show success message
        alert('Employee updated successfully!');
      } else {
        alert('Failed to update employee');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Error updating employee');
    }
  };

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteConfirmModal(true);
  };

  const handleDeleteEmployee = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/employees/${selectedEmployee.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const updatedEmployees = employees.filter(emp => emp.id !== selectedEmployee.id);
        setEmployees(updatedEmployees);
        setShowDeleteConfirmModal(false);
        setSelectedEmployee(null);
        
        // Show success message
        alert('Employee deleted successfully!');
      } else {
        alert('Failed to delete employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      alert('Error deleting employee');
    }
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    alert(`Employee Details:\nName: ${employee.firstName} ${employee.lastName}\nEmail: ${employee.email}\nPosition: ${employee.position}\nDepartment: ${employee.department}\nStatus: ${employee.status.replace('-', ' ')}`);
  };

  const handleEmployeeSelection = (employeeId) => {
    // Only allow selection for administrators
    if (userType !== 'administrator') return;
    
    const updatedEmployees = employees.map(emp =>
      emp.id === employeeId
        ? { ...emp, selected: !emp.selected }
        : emp
    );
    setEmployees(updatedEmployees);
    
    const selected = updatedEmployees.filter(emp => emp.selected);
    setSelectedEmployees(selected);
  };

  const handleSelectAll = (e) => {
    // Only allow selection for administrators
    if (userType !== 'administrator') return;
    
    const isChecked = e.target.checked;
    const updatedEmployees = employees.map(emp => ({
      ...emp,
      selected: isChecked
    }));
    setEmployees(updatedEmployees);
    setSelectedEmployees(isChecked ? updatedEmployees : []);
  };

  const handleBulkDelete = () => {
    if (selectedEmployees.length === 0) {
      alert('Please select at least one employee to delete');
      return;
    }
    setShowBulkDeleteModal(true);
  };

  const handleBulkDeleteSubmit = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const deletePromises = selectedEmployees.map(emp =>
        fetch(`/api/employees/${emp.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      );

      const responses = await Promise.all(deletePromises);
      const allSuccessful = responses.every(response => response.ok);

      if (allSuccessful) {
        const updatedEmployees = employees.filter(emp => !emp.selected);
        setEmployees(updatedEmployees);
        setSelectedEmployees([]);
        setShowBulkDeleteModal(false);
        alert(`${selectedEmployees.length} employee(s) deleted successfully!`);
      } else {
        alert('Failed to delete some employees');
      }
    } catch (error) {
      console.error('Error deleting employees:', error);
      alert('Error deleting employees');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <Header />
      
      <main className="dashboard-main">
        {/* Header Section */}
        <div className="dashboard-header">
          <h1>Employee Management Dashboard</h1>
          <p>Manage company's employee information</p>
          <div className="user-info">
            <span>Logged in as: {userType}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeSection === 'employees' ? 'active' : ''}`}
            onClick={() => setActiveSection('employees')}
          >
            Employees
          </button>
          <button 
            className={`tab-btn ${activeSection === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveSection('reports')}
          >
            Reports
          </button>
          {isAdmin && (
            <button 
              className={`tab-btn ${activeSection === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveSection('settings')}
            >
              Settings
            </button>
          )}
        </div>

        {/* Main Content */}
        {activeSection === 'employees' && (
          <div className="dashboard-content">
            {/* Search and Stats Section */}
            <div className="dashboard-actions">
              <div className="search-section">
                <h2>Search</h2>
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search employees by name, email, or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <span className="search-info">Add Employee Assistant employees in the system</span>
                </div>
                {isAdmin && (
                  <button 
                    className="primary-btn"
                    onClick={() => setShowAddEmployeeModal(true)}
                  >
                    Add New Employee
                  </button>
                )}
              </div>

              {/* Statistics Section */}
              <div className="stats-section">
                <div className="stat-card">
                  <h3>{employees.length}</h3>
                  <p>Total Employees</p>
                </div>
                <div className="stat-card">
                  <h3>{employees.filter(e => e.status === 'ACTIVE').length}</h3>
                  <p>Active</p>
                </div>
                <div className="stat-card">
                  <h3>{employees.filter(e => e.status === 'ON-LEAVE').length}</h3>
                  <p>On Leave</p>
                </div>
                <div className="stat-card">
                  <h3>2</h3>
                  <p>Vacancy</p>
                </div>
              </div>
            </div>

            {/* Selection Actions - Only show for admins */}
            {isAdmin && selectedEmployees.length > 0 && (
              <div className="selection-actions">
                <span>{selectedEmployees.length} employee(s) selected</span>
                <button className="secondary-btn delete" onClick={handleBulkDelete}>
                  Delete Selected
                </button>
              </div>
            )}

            {/* Employee Records Table */}
            <div className="employee-records">
              <div className="section-header">
                <h2>Employee Records</h2>
                <p>View and manage all employee information</p>
              </div>

              <div className="table-container">
                <table className="employees-table">
                  <thead>
                    <tr>
                      {isAdmin && (
                        <th>
                          <input
                            type="checkbox"
                            onChange={handleSelectAll}
                            checked={selectedEmployees.length === employees.length && employees.length > 0}
                          />
                        </th>
                      )}
                      <th>Employee</th>
                      <th>Position</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.id}>
                        {isAdmin && (
                          <td>
                            <input
                              type="checkbox"
                              checked={employee.selected || false}
                              onChange={() => handleEmployeeSelection(employee.id)}
                            />
                          </td>
                        )}
                        <td>
                          <div className="employee-info">
                            <span className="employee-avatar">{employee.initials}</span>
                            <div className="employee-details">
                              <strong>{employee.firstName} {employee.lastName}</strong>
                              <span>{employee.email}</span>
                            </div>
                          </div>
                        </td>
                        <td>{employee.position}</td>
                        <td>
                          <span className="department-badge">{employee.department}</span>
                        </td>
                        <td>
                          <span className={`status-badge ${employee.status.toLowerCase().replace('_', '-')}`}>
                            {employee.status.replace('-', ' ')}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            {isAdmin && (
                              <button 
                                className="icon-btn" 
                                title="Edit"
                                onClick={() => handleEditEmployee(employee)}
                              >
                                ✏️
                              </button>
                            )}
                            <button 
                              className="icon-btn" 
                              title="View"
                              onClick={() => handleViewEmployee(employee)}
                              >
                              👁️
                            </button>
                            {isAdmin && (
                              <button 
                                className="icon-btn delete" 
                                title="Delete"
                                onClick={() => handleDeleteClick(employee)}
                              >
                                🗑️
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder for other sections */}
        {activeSection === 'reports' && (
          <div className="dashboard-content">
            <h2>Reports Section</h2>
            <p>Employee reports and analytics will be shown here.</p>
          </div>
        )}

        {activeSection === 'settings' && isAdmin && (
          <div className="dashboard-content">
            <h2>Settings Section</h2>
            <p>Dashboard settings and configuration will be shown here.</p>
          </div>
        )}
      </main>

      {/* Add Employee Modal - Only for admins */}
      {isAdmin && showAddEmployeeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Employee</h3>
              <button 
                className="modal-close"
                onClick={() => setShowAddEmployeeModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleAddEmployee} className="modal-form">
              <div className="form-row">
                <div className="form-group half-width">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={newEmployee.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div className="form-group half-width">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={newEmployee.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newEmployee.email}
                  onChange={handleInputChange}
                  placeholder="Enter employee's email"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="position">Position *</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={newEmployee.position}
                  onChange={handleInputChange}
                  placeholder="Enter employee's position"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <select
                  id="department"
                  name="department"
                  value={newEmployee.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Product">Product</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="HR">Human Resources</option>
                </select>
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="secondary-btn"
                  onClick={() => setShowAddEmployeeModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Employee Modal - Only for admins */}
      {isAdmin && showUpdateEmployeeModal && selectedEmployee && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Update Employee</h3>
              <button 
                className="modal-close"
                onClick={() => setShowUpdateEmployeeModal(false)}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleUpdateEmployee} className="modal-form">
              <div className="form-row">
                <div className="form-group half-width">
                  <label htmlFor="update-firstName">First Name *</label>
                  <input
                    type="text"
                    id="update-firstName"
                    name="firstName"
                    value={updateEmployee.firstName}
                    onChange={handleUpdateInputChange}
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div className="form-group half-width">
                  <label htmlFor="update-lastName">Last Name *</label>
                  <input
                    type="text"
                    id="update-lastName"
                    name="lastName"
                    value={updateEmployee.lastName}
                    onChange={handleUpdateInputChange}
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="update-email">Email Address *</label>
                <input
                  type="email"
                  id="update-email"
                  name="email"
                  value={updateEmployee.email}
                  onChange={handleUpdateInputChange}
                  placeholder="Enter employee's email"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="update-position">Position *</label>
                <input
                  type="text"
                  id="update-position"
                  name="position"
                  value={updateEmployee.position}
                  onChange={handleUpdateInputChange}
                  placeholder="Enter employee's position"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="update-department">Department *</label>
                <select
                  id="update-department"
                  name="department"
                  value={updateEmployee.department}
                  onChange={handleUpdateInputChange}
                  required
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Product">Product</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="HR">Human Resources</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="update-status">Status</label>
                <select
                  id="update-status"
                  name="status"
                  value={updateEmployee.status}
                  onChange={handleUpdateInputChange}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="ON-LEAVE">ON-LEAVE</option>
                  <option value="TERMINATED">TERMINATED</option>
                </select>
              </div>
              
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="secondary-btn"
                  onClick={() => setShowUpdateEmployeeModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  Update Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal - Only for admins */}
      {isAdmin && showDeleteConfirmModal && selectedEmployee && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm Delete</h3>
              <button 
                className="modal-close"
                onClick={() => setShowDeleteConfirmModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>{selectedEmployee.firstName} {selectedEmployee.lastName}</strong>?</p>
              <p>This action cannot be undone.</p>
            </div>
            
            <div className="modal-actions">
              <button 
                type="button" 
                className="secondary-btn"
                onClick={() => setShowDeleteConfirmModal(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="primary-btn delete-btn"
                onClick={handleDeleteEmployee}
              >
                Delete Employee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Confirmation Modal - Only for admins */}
      {isAdmin && showBulkDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm Bulk Delete</h3>
              <button 
                className="modal-close"
                onClick={() => setShowBulkDeleteModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <p>Are you sure you want to delete {selectedEmployees.length} employee(s)?</p>
              <p>This action cannot be undone.</p>
              <ul>
                {selectedEmployees.slice(0, 5).map(emp => (
                  <li key={emp.id}>{emp.firstName} {emp.lastName}</li>
                ))}
                {selectedEmployees.length > 5 && <li>...and {selectedEmployees.length - 5} more</li>}
              </ul>
            </div>
            
            <div className="modal-actions">
              <button 
                type="button" 
                className="secondary-btn"
                onClick={() => setShowBulkDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="primary-btn delete-btn"
                onClick={handleBulkDeleteSubmit}
              >
                Delete {selectedEmployees.length} Employees
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Dashboard;