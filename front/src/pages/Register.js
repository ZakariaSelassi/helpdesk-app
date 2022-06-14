import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {register} from "../features/auth/authSlice"
import {FaUser} from 'react-icons/fa'
import {BiShow, BiHide} from 'react-icons/bi'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  const [show,setShow] = useState(false);
  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:'',
    passwordconf:'',
  })

  const {name,email,password,passwordconf} = formData;

  const dispatch = useDispatch();

  const {user,loading,error} = useSelector(state => state.auth);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]:event.target.value
    })
  }
  const handleShow = () => {
    setShow(!show);
  }

  const onSubmit = (event) =>{
    event.preventDefault();
    if(password !== passwordconf){
      toast.error("Password don't match ! ")
    }else{
      const userData ={
        name,
        email,
        password,
      }
      dispatch(register(userData))
      toast.success("Register Successfully ! ")
    }
  }
  return (
    <>
      <section className='register'>
        <h1> <FaUser/> Register {user}</h1>
        <p>Please create an account</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
                  className='form-control'
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  placeholder="name"
                  onChange={handleChange}
                  required/>
          </div>
          <div className='form-group'>
            <input
                  className='form-control'
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="email"
                  onChange={handleChange}
                  required  />
          </div>
          <div className='form-group password'>
            <div className='icon-container' onClick={() => handleShow()}>
                  {
                    show ? <BiHide className='icon'/>  : <BiShow className='icon'/> 
                  }
                 
            </div>
            <div>
              <input
                  className='form-control'
                  type={show ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  placeholder="password"
                  onChange={handleChange}/>
            </div>
          </div>
          <div className='form-group'>
              <div className='icon-container' onClick={() => handleShow()}>

                 {
                    show ? <BiHide className='icon'/>  : <BiShow className='icon'/> 
                  }
              </div>
            <div>
               <input
                  className='form-control'
                  type={show ? "text" : "password"}
                  name="passwordconf"
                  id="passwordconf"
                  value={passwordconf}
                  placeholder="password"
                  onChange={handleChange}/>
            </div>  
          </div>

          <div className='form-group'>
              <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register