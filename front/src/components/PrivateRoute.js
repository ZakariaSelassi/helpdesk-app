import React from 'react'
import { Navigate ,Outlet} from 'react-router-dom'
import {useAuthStatus} from '../hooks/useAuthStatus'
import { useSelector } from 'react-redux'
const PrivateRoute = () => {

 const {checkingStatus} = useAuthStatus()
  
 const {user} = useSelector(state => state.auth)
 if(checkingStatus){
     return <div>loading...</div>
 }

 return ( user ? <Outlet/> : <Navigate to='/login'/>)
}

export default PrivateRoute