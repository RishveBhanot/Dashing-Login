import React from 'react'
import { useState, useEffect} from 'react';
import './Login.css'

import email_icon from '../assets/email.png'
import password_icon from '../assets/password.png'
import person_icon from '../assets/person.png'
import check_icon from '../assets/check_icon.png'

function Login() {

    const initialValues = {username: '', email: '', password: ''};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value});
        validate({ ...formValues, [name]: value }); 
    
}
const validate = (values) => {
    const errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i; // Regex for email format
    const regexUsername = /^[a-zA-Z\s]*$/; // Regex for username: only alphabets and spaces

    // Username Validation
    
    if (values.username && !regexUsername.test(values.username)) {
        errors.username = 'Username format is invalid';
    } else if (!values.username) {
        errors.username = 'Username is required';
    }

    // Email Validation
         if (values.email && !regexEmail.test(values.email)) {
            errors.email = 'Invalid email format';
        } else if (!values.email) {
            errors.email = 'Email is required';
        }
    
     // Password Validation
     if (values.password) {
        if (values.password.length < 4) {
            errors.password = 'Password must be more than 4 characters';
        } else if (values.password.length > 10) {
            errors.password = 'Password cannot exceed 10 characters';
        }
    } else {
        errors.password = 'Password is required';
    }

    setFormErrors(errors); // Update form errors state
};
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        validate(formValues);
    };
    const handleKeyDown = (e)=> {
        const regexUsername = /^[a-zA-Z\s]*$/; // Regex for username: only alphabets and spaces
        if (!regexUsername.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
            e.preventDefault();
        }
    }

    
        const isFormValid = Object.keys(formErrors).length === 0 && formValues.username && formValues.email && formValues.password;
            

  return (
    <form className="container" onSubmit={handleSubmit}>
        <div className="header">
            <div className="text">Login Form</div>
            <div className="underline"></div>
        </div>
        {/* Name Field*/}
        <div className="inputs">
            <div className="input-container">
                <img src={person_icon} alt="" />
                <input type="text" 
                       name="username" 
                       placeholder='Enter Your Name' 
                       maxLength={20}
                       value={formValues.username}
                       onChange={handleChange}
                       onKeyDown={handleKeyDown}
                       style={{ borderColor: formValues.username && !formErrors.username ? 'green' : '' }}
                       />
                    {formValues.username && !formErrors.username && (
                        <img src={check_icon} alt="valid" className="valid-icon" />
                    )}
                    {formErrors.username && <span className="error-text">{formErrors.username}</span>}
            </div>
             {/* Email Field */}
            <div className="input-container">
                <img src={email_icon} alt="" />
                <input type="email" 
                       name="email" 
                       placeholder='Email ID' 
                       value={formValues.email}
                       onChange={handleChange}
                       style={{ borderColor: formValues.email && !formErrors.email ? 'green' : '' }}

                       />
                       {formValues.email && !formErrors.email && (
                        <img src={check_icon} alt="valid" className="valid-icon" />
                    )}
                    {formErrors.email && <span className="error-text">{formErrors.email}</span>}

            </div>
            {/* Password Field */}
            <div className="input-container">
                <img src={password_icon} alt="" />
                <input type="password" 
                       name="password" 
                       placeholder='Password' 
                       maxLength={10}
                       value={formValues.password}
                       onChange={handleChange}
                       style={{ borderColor: formValues.password && !formErrors.password ? 'green' : '' }}

                       />
                       {formValues.password && !formErrors.password && (
                        <img src={check_icon} alt="valid" className="valid-icon" />
                    )}
                     {formErrors.password && <span className="error-text">{formErrors.password}</span>}

            </div>
        </div>
        {/* Submit Button */}
                <div className="submit_container">
                <button onClick={handleSubmit} type="submit" className="submit" disabled={!isFormValid}>Submit</button>
        </div>
        
    </form>
  )

}

export default Login