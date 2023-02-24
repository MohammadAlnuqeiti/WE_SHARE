import { useState } from "react";
import "./register.css";
import React from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';


export default function Register() {

  const [data , setdata] = useState({

  });

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
        <InputGroup className="mb-3">
            <FloatingLabel controlId="floatingPassword" label="First name">
            <Form.Control aria-label="First name" placeholder="First name"/>
            </FloatingLabel>  
            <FloatingLabel controlId="floatingPassword" label="Last name">
            <Form.Control aria-label="Last name" placeholder="Last name"/> 
            </FloatingLabel>
        </InputGroup>
        <InputGroup className="mb-3">
            <FloatingLabel controlId="floatingPassword" label="Email">
            <Form.Control aria-label="email" placeholder="email" name="email"/>
            </FloatingLabel>  
        </InputGroup>
        <InputGroup className="mb-3">
            <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control aria-label="password" placeholder="password" name="password"/>
            </FloatingLabel>  
        </InputGroup>
        <InputGroup className="mb-3">
            <FloatingLabel controlId="floatingPassword" label="Confirm Password">
            <Form.Control aria-label="confirmpassword" placeholder="confirmpassword" name="confirmpassword"/>
            </FloatingLabel>  
        </InputGroup>
            <button className="loginButton">Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}