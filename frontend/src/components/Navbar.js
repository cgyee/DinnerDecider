import React from 'react';
import {
    NavLink,
} from "react-router-dom";

const Navbar = () =>{
    
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="navbar-expand">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a to='/' className="nav-link">Home</a>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/Signup' className="nav-link"><span>Sign Up</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/Address' className="nav-link"><span>Search</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/Vote' className="nav-link"><span >Vote</span></NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
export default Navbar;