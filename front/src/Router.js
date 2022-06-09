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
const Router = () => {
  return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route index element={<Home/>} />
                        <Route path='/register' element={<Register/>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
  )
}

export default Router;