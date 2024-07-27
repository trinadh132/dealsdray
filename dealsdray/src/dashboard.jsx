import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './dashboard.module.css'; 
import Nav from './nav';

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeResponse = await fetch('http://localhost:3001/email');
        const employeeResult = await employeeResponse.json();
        if (employeeResponse.status === 200) {
          setEmployees(employeeResult.data);
        } else {
          console.error("Error fetching employee data:", employeeResult.message);
        }

        const imageResponse = await fetch('http://localhost:3001/image');
        const imageResult = await imageResponse.json();
        if (imageResponse.status === 200) {
          setImages(imageResult.data);
        } else {
          console.error("Error fetching image data:", imageResult.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getEmployeeImage = (email) => {
    const image = images.find(img => img.email === email);
    return image ? image.image : ''; 
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (direction) => {
    setCurrentPage(prevPage => direction === 'next' ? prevPage + 1 : prevPage - 1);
  };

  const handleEdit = (employee) => {
    navigate(`/edit`, { state: { employee } });
  };

  const handleDelete = async ( email) => {
    try {
      const response = await fetch(`http://localhost:3001/employee`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email:email })
      });
      if (response.status === 200) {
        setEmployees(employees.filter(employee => employee.f_email !== email));
        setImages(images.filter(image => image.email !== email));
        alert('Employee deleted successfully');
      } else {
        console.error("Error deleting employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.f_name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Nav/>
      <div className={styles.container}>
        <h1 className={styles.title}>Employee Dashboard</h1>
        <div className={styles.secondtop}>
          <div className={styles.actions}>
            <input
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={handleSearch}
              className={styles.searchInput}
            />
            <button 
              className={styles.createButton}
              onClick={() => navigate('/employee')}
            >
              Create New Employee
            </button>
          </div>
          <p className={styles.totalCount}>Total Count: {filteredEmployees.length}</p>
          <div className={styles.pagination}>
            <button 
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
              className={styles.pageButton}
            >
              Previous
            </button>
            <span className={styles.pageInfo}>
              Page {currentPage}
            </span>
            <button 
              onClick={() => handlePageChange('next')}
              disabled={currentPage * itemsPerPage >= filteredEmployees.length}
              className={styles.pageButton}
            >
              Next
            </button>
          </div>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th onClick={() => sortData('f_id')}>Unique ID</th>
              <th>Image</th>
              <th onClick={() => sortData('f_name')}>Name</th>
              <th onClick={() => sortData('f_email')}>Email</th>
              <th onClick={() => sortData('f_mobile')}>Mobile</th>
              <th onClick={() => sortData('f_designation')}>Designation</th>
              <th onClick={() => sortData('f_gender')}>Gender</th>
              <th onClick={() => sortData('f_course')}>Course</th>
              <th onClick={() => sortData('f_date')}>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.f_id}</td>
                <td>
                  <img
                    src={getEmployeeImage(employee.f_email)}
                    alt={`${employee.f_name}'s profile`}
                    className={styles.image}
                  />
                </td>
                <td>{employee.f_name}</td>
                <td>{employee.f_email}</td>
                <td>{employee.f_mobile}</td>
                <td>{employee.f_designation}</td>
                <td>{employee.f_gender}</td>
                <td>{employee.f_course}</td>
                <td>{employee.f_date}</td>
                <td className={styles.tableaction}>
                  <button className={styles.edit} onClick={() => handleEdit(employee)}>Edit</button>
                  <button className={styles.delete} onClick={() => handleDelete(employee.f_email)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;
