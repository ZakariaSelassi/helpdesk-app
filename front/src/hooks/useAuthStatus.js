import { useState,useEffect } from "react";
import { useSelector } from "react-redux";


export const useAuthStatus = () => {
    const [loggeIn,setLoggedIn] = useState(false)
    const [checkingStatus,setCheckingStatus] =useState(true)

    const {user} = useSelector(state => state.auth)
 
    useEffect(() => {
        if(user){
            setLoggedIn(true)
        }else{
            setLoggedIn(false)
        }
        setCheckingStatus(false)
    },[user,loggeIn,checkingStatus])

    return {loggeIn,checkingStatus}
}