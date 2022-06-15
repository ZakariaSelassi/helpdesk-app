import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import {FaUser} from 'react-icons/fa'
import { Link,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
const Login = () => {

  const navigate = useNavigate();
  const [formData,setFormData] = useState({
    email:'',
    password:'',
  })
  const {email,password} = formData;
  const dispatch = useDispatch();
  const {user,error,loading} = useSelector(state => state.auth);

  useEffect(() => {
    if(error && !user){
      toast.error(error)
    }
    if(user){
      navigate('/')
    
    }
  },[user, error,navigate])
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]:event.target.value
    })
  }
  const onSubmit = (event) => {
    event.preventDefault();
    const userData ={
      email,
      password,
    }    
    dispatch(login(userData))
  }

  if(loading){
    return <div>loading....</div>
  }
  return (
    <>
      <section className='register'>
        <h1> <FaUser/> Login</h1>
        <p>Please login with your account or  <Link to='/register'>Register</Link> </p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit} >
          <div className='form-group'>
            <input
                  className='form-control'
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="email"
                  onChange={handleChange}
                  required/>
          </div>
          <div className='form-group'>
            <input
                  className='form-control'
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  placeholder="password"
                  onChange={handleChange}
                  required  />
          </div>
          <div className='form-group'>
                <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>

  )
}

export default Login