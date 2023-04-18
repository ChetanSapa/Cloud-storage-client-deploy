import React from 'react';
import {useDispatch} from 'react-redux'
import {deleteAvatar, uploadAvatar} from '../../actions/user'
import '../../styles/profile.scss'

const Profile = () => {
    const dispatch = useDispatch()

    const changeHandler = (e) => {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    return (
        <div className={'profile'}>
            <input accept={'image/*'} onChange={(e) => changeHandler(e)} type="file" placeholder={'Upload ava...'}/>
            <button onClick={() => dispatch(deleteAvatar())}>Delete Ava</button>
        </div>
    );
};

export default Profile;