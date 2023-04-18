import React, {useState} from 'react';
import Input from '../input/input'
import '../../styles/authorization.scss'
import '../../styles/navbar.scss'
import {NavLink} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {login} from '../../actions/user'

const Authorization = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    return (
        <div className={'auth-card'}>
            <div className={'auth-card-title'}>Login</div>
            <Input value={email} setValue={setEmail} type={'email'} placeholder={'Type your email...'}/>
            <Input value={password} setValue={setPassword} type={'password'} placeholder={'Type your password...'}/>
            <div className={'auth-card-btns'}>
                <button onClick={()=>dispatch(login(email, password))}>Login</button>
                <span>don't have an account?</span>
                <NavLink to={'/registration'}>Registration</NavLink>
            </div>
        </div>
    );
};

export default Authorization;