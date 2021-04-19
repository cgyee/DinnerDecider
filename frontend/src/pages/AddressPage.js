import React from 'react';
import Inputfield from '../components/Inputfield';
import IconButton from '../components/IconButton';

const AddressPage = () => {
    return (
        <div className="row center-abs">
            <Inputfield placeholder={'Zip'} className={'input-box'}/>
            <IconButton />
        </div>
    )
}
export default AddressPage;