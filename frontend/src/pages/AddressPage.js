import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import isValidZipCode from 'is-valid-zipcode';

const AddressPage = (props) => {
    const history = useHistory()
    const [zipCode, setZipCode] = useState('')
    const onChange = (e) => setZipCode(e.target.value);
    const onClick = () => history.push('/Vote')
    return (
        <div className="container" style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}>
            <div className='row'>
                <div className="input-group mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder=" Enter Zip Code" 
                        aria-label="Zip Code" 
                        aria-describedby="basic-addon2"
                        onChange={onChange}
                        value={zipCode}
                    />
                    <button
                        disabled={!isValidZipCode(zipCode)}
                        className="btn btn-primary input-group-text" 
                        onClick={onClick}
                        id="basic-addon2">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default AddressPage;