import React, {useEffect} from 'react';
import Inputfield from '../components/Inputfield';
import IconButton from '../components/IconButton';

const AddressPage = (props) => {
    return (
        <div className="container" style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}>
            <div className='row'>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder=" Enter Zip Code" aria-label="Zip Code" aria-describedby="basic-addon2"/>
                    <span className="input-group-text" id="basic-addon2"><i className="fas fa-search"></i></span>
                </div>
            </div>
        </div>
    )
}
export default AddressPage;