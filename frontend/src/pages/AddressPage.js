import React, {useEffect} from 'react';
import Inputfield from '../components/Inputfield';
import IconButton from '../components/IconButton';

const AddressPage = (props) => {

    const {token, useToken} = props.useToken();
    useEffect(() => {
        
    }, [])
    return (
        token ?
        <div className="row center-abs">
            <Inputfield placeholder={'Zip'} className={'input-box'}/>
            <IconButton />
        </div>:
        <Redirect to='/' />
    )
}
export default AddressPage;