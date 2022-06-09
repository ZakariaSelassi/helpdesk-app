import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div className='container'>
        <Header/>    
        <Outlet/>
        <ToastContainer/>
    </div>
 
  )
}

export default App