import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import App from './App'
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import NewTicket from './pages/NewTicket';
import PrivateRoute from './components/PrivateRoute';
import Tickets from './pages/Tickets';
import SingleTicket from './pages/SingleTicket';
const Router = () => {
  return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route index element={<Home/>} />
                        <Route path='/register' element={<Register/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/new-ticket' element={<PrivateRoute/>}>
                           <Route path='/new-ticket' element={<NewTicket/>} /> 
                        </Route>
                        <Route path='/view-ticket' element={<PrivateRoute/>}>
                           <Route path='/view-ticket' element={<Tickets/>} />
                           <Route path='/view-ticket/:id' element={<SingleTicket/>} />  
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
  )
}

export default Router;