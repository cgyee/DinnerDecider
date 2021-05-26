import React from 'react';
import {
    NavLink,
    useHistory
} from "react-router-dom";
import {isAuthenticated, unAuthenticate} from '../auth'
import {baseUrl} from '../urlpath'

const Navbar = () =>{
    const isLoggedIn = isAuthenticated()
    const logOut =  () => {
        fetch(`${baseUrl}/local/logout`, {
            method:'GET',
            mode:'cors',
            credentials:'include'
        })
        unAuthenticate()

    }
    return (
        <nav className="navbar navbar-dark bg-primary mb-4">
            <div className="navbar-expand">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {
                        !isLoggedIn &&
                        [
                        <li className="nav-item" key='login'>
                                <NavLink to='/Login' className="nav-link"><span>Login</span></NavLink>
                        </li>,
                        <li className="nav-item" key='signup'>
                            <NavLink to='/Signup' className="nav-link"><span>Sign Up</span></NavLink>
                        </li>
                        ]
                    }
                    {
                        isLoggedIn &&
                        [
                            <li className="nav-item" key='home'>
                                <NavLink to='/' className='nav-link'><span>Home</span></NavLink>
                            </li>,
                            <li className="nav-item" key='search'>
                                <NavLink to='/Address' className="nav-link"><span>Search</span></NavLink>
                            </li>,
                            // <li className="nav-item" key='vote'>
                            //     <NavLink to='/Vote' className="nav-link"><span >Vote</span></NavLink>
                            // </li>,
                            <li className="nav-item" key='logout'>
                                <NavLink to='/Signup' className="nav-link" onClick={logOut}><span>Logout</span></NavLink>
                            </li>,
                        ]
                    }
                </ul>
            </div>
        </nav>
    );
}
export default Navbar;