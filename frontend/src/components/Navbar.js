import React from 'react';
import {
    NavLink,
} from "react-router-dom";

const Navbar = () =>{
    
    return (
        <nav style={{}}>
            <ul className='row' style={{'justifyContent':'flex-end'}}>
                <li className="list-item"><NavLink to='/' style={{'textDecoration':'none'}}><span className='list-link'>Home</span></NavLink></li>
                <li className="list-item"><NavLink to='/Signup' style={{'textDecoration':'none'}}><span className='list-link'>Sign Up</span></NavLink></li>
                <li className="list-item"><NavLink to='/Address' style={{'textDecoration':'none'}}><span className='list-link'>Search</span></NavLink></li>
                <li className="list-item"><NavLink to='/Vote' style={{'textDecoration':'none'}}><span className='list-link'>Vote</span></NavLink></li>
            </ul>
        </nav>
    );
}
export default Navbar;