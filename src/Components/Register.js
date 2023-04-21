import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css'
import {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';

export const Register = () => {

  const apiUrl = 'http://localhost:3000'
  const apiUrlDeployed = 'http://localhost:3000'

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async(e) => {
    e.preventDefault();
    const post = await axios.post(`${apiUrl}/user/register`, {
      email, password
    })
    localStorage.setItem('token', post.data.token);
    navigate('/todo')
  }

  return (
    <div className=' main-div container mt-4'>

      <h1>Register</h1>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick={onSubmit}>
        Register
      </Button>
      <br></br>
      <a href='/' className='mt-3'>Already Have an Account? Login now</a>
    </Form>

    </div>
  )
}
