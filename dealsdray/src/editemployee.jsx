import Compressor from 'compressorjs';
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import url from './url';
import Nav from './nav';
import styles from './create.module.css'; // Import your CSS module

function EditEmployee() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { employee } = state;
  
  const [data, setData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    course: '',
    f_image: null,
    gender: '',
    description: 'Default Description',
    contenttype: ''
  });

  const [courses, setCourses] = useState({
    MCA: false,
    BCA: false,
    BSC: false
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (employee) {
      setData({
        name: employee.f_name,
        email: employee.f_email,
        mobile: employee.f_mobile,
        designation: employee.f_designation,
        course: employee.f_course,
        f_image: employee.f_image,
        gender: employee.f_gender,
        description: employee.description,
        contenttype: employee.contenttype
      });

      const courseArray = employee.f_course.split(',');
      setCourses({
        MCA: courseArray.includes('MCA'),
        BCA: courseArray.includes('BCA'),
        BSC: courseArray.includes('BSC')
      });
    }
  }, [employee]);

  const options = [
    { value: 'HR', label: 'HR' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Sales', label: 'Sales' }
  ];

  const radioOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' }
  ];

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCourses(prevCourses => {
      const updatedCourses = { ...prevCourses, [name]: checked };
      const courseString = Object.keys(updatedCourses).filter(key => updatedCourses[key]).join(',');

      setData(prevData => ({
        ...prevData,
        course: courseString
      }));

      return updatedCourses;
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      new Compressor(file, {
        quality: 0.6,
        maxWidth: 800,
        maxHeight: 800,
        success(result) {
          const reader = new FileReader();
          reader.readAsDataURL(result);
          reader.onload = () => {
            setImage(reader.result);
            setData(prevData => ({
              ...prevData,
              f_image: reader.result,
              contenttype: 'image/jpeg'
            }));
          };
        },
        error(err) {
          console.log(err.message);
        },
      });
    }
  };

  const updateEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/employee`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          designation: data.designation,
          gender: data.gender,
          course: data.course
        })
      });

      const imageresponse = await fetch(`${url}/image`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          f_image: data.f_image,
          email: data.email,
          description: data.description,
          contenttype: data.contenttype
        })
      });

      if (response.status === 200 && imageresponse.status === 200) {
        console.log("Employee updated");
        navigate('/dashboard');
      } else {
        console.log("Error updating employee:", response.statusText);
      }
    } catch (error) {
      console.log("This error occurred:", error);
    }
  };

  return (
    <>
      <Nav />
      <div className={styles.container}>
        <form onSubmit={updateEmployee} className={styles.form}>
          <p className={styles.field}>
            <label className={styles.label}>Name:</label>
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="Enter your legal name"
              required
              value={data.name}
              onChange={handleInputChange}
            />
          </p>
          <p className={styles.field}>
            <label className={styles.label}>Email:</label>
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="Enter your personal email"
              required
              value={data.email}
              onChange={handleInputChange}
              readOnly
            />
          </p>
          <p className={styles.field}>
            <label className={styles.label}>Phone number:</label>
            <input
              className={styles.input}
              type="text"
              name="mobile"
              placeholder="Enter your phone number"
              pattern='^\d{10}$'
              title='phone number should contain 10 digits and only numbers'
              required
              value={data.mobile}
              onChange={handleInputChange}
            />
          </p>
          <p className={styles.field}>
            <label className={styles.label}>Designation:</label>
            <select
              className={styles.select}
              name="designation"
              value={data.designation}
              onChange={handleInputChange}
            >
              <option value="" disabled>Select an option</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </p>
          <p className={styles.field}>
            <label className={styles.label}>Gender:</label>
            {radioOptions.map((option) => (
              <div key={option.value} className={styles.radioContainer}>
                <input
                  className={styles.radio}
                  type="radio"
                  id={option.value}
                  name="gender"
                  value={option.value}
                  checked={data.gender === option.value}
                  onChange={handleInputChange}
                />
                <label className={styles.radioLabel} htmlFor={option.value}>{option.label}</label>
              </div>
            ))}
          </p>
          <p className={styles.field}>
            <label className={styles.label}>Course:</label>
            <div className={styles.checkboxContainer}>
              <input
                className={styles.checkbox}
                type="checkbox"
                id="MCA"
                name="MCA"
                checked={courses.MCA}
                onChange={handleCheckboxChange}
              />
              <label className={styles.checkboxLabel} htmlFor="MCA">MCA</label>
            </div>
            <div className={styles.checkboxContainer}>
              <input
                className={styles.checkbox}
                type="checkbox"
                id="BCA"
                name="BCA"
                checked={courses.BCA}
                onChange={handleCheckboxChange}
              />
              <label className={styles.checkboxLabel} htmlFor="BCA">BCA</label>
            </div>
            <div className={styles.checkboxContainer}>
              <input
                className={styles.checkbox}
                type="checkbox"
                id="BSC"
                name="BSC"
                checked={courses.BSC}
                onChange={handleCheckboxChange}
              />
              <label className={styles.checkboxLabel} htmlFor="BSC">BSC</label>
            </div>
          </p>
          <p className={styles.field}>
            <label className={styles.label}>Upload Image:</label>
            <input
              className={styles.fileInput}
              type="file"
              accept="image/jpeg,image/png" 
              onChange={handleFileChange}
            />
            <small className={styles.fileNote}>Upload only JPG and PNG files</small>
          </p>
          <p className={styles.field}>
            <label className={styles.label}>Image Description:</label>
            <input
              className={styles.input}
              type="text"
              name="description"
              placeholder="Enter image description"
              value={data.description}
              onChange={handleInputChange}
            />
          </p>
          <p className={styles.field}>
            <label className={styles.label}>Content Type:</label>
            <input
              className={styles.input}
              type="text"
              name="contenttype"
              readOnly
              value={data.contenttype}
            />
          </p>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>Update</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditEmployee;
