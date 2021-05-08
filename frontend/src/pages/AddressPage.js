import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import isValidZipCode from 'is-valid-zipcode';

const AddressPage = () => {
    const history = useHistory()
    const [zipCode, setZipCode] = useState('')
    const onChange = (e) => setZipCode(e.target.value);
    const onClick = () => history.push('/Vote')
    return (
        <div className="container" style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)'}}>
            <div className='row'>
                <div className="col-4 input-group mb-3">
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
                {
                    isValidZipCode(zipCode) &&
                    <div className='row'>
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button
                                disabled={!isValidZipCode(zipCode)}
                                onClick={onClick} 
                                className="btn btn-primary" 
                                type="button"
                                >Vote
                            </button>
                            <button
                                disabled={!isValidZipCode(zipCode)} 
                                className="btn btn-Secondary mb-3" 
                                type="button"
                                data-bs-toggle="collapse" data-bs-target="#inviteOthersCollapse"
                                aria-expanded="false" aria-controls="inviteOthersCollapse"
                                >Invite Others?
                            </button>
                        </div>
                        <div className='collapse row justify-content-center' id='inviteOthersCollapse'>
                            <div className='card card-body col-6' style={{textAlign:'center', alignSelf:'center'}}>
                                Link Stuff
                            </div>
                        </div>
                    </div>     
                }
            </div>
        </div>
    )
}
export default AddressPage;