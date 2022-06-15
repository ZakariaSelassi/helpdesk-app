import React from 'react'
import {FaSignInAlt,FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link ,useNavigate} from 'react-router-dom'
import { useSelector,useDispatch }  from 'react-redux'
import {logout} from '../features/auth/authSlice'
const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.auth)

    const onLogout = () => {
        dispatch(logout())
        navigate('/')
    }
  return (
    
    <header>
        <div className='logo'>
            <Link to='/'>Support</Link>
        </div>
        <ul>
            <li>
                {
                    user ? 
                    ( 
                    <div onClick={onLogout}>
                          <FaSignOutAlt /> Logout
                    </div>
                  
                   ) 
                : 
                    (<Link to='/login'>
                    <FaSignInAlt /> Login
                    </Link>)
                }
               
            </li>
            <li>
                <Link to='/register'>
                    <FaUser/> Register 
                </Link>
            </li>
        </ul>
    </header>

)
}

export default Header