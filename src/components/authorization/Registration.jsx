import React, {useState} from 'react';
import Input from '../input/input'
import '../../styles/authorization.scss'
import '../../styles/navbar.scss'
import {NavLink} from 'react-router-dom'
import {registration} from '../../actions/user'

const Registration = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <div className={'auth-card'}>
            <div className={'auth-card-title'}>Registration</div>
            <Input value={email} setValue={setEmail} type={'email'} placeholder={'Type your email...'}/>
            <Input value={password} setValue={setPassword} type={'password'} placeholder={'Type your password...'}/>
            {/*<Input type={'password'} placeholder={'Confirm your password...'}/>*/}
            <div className={'auth-card-btns'}>
                <button onClick={() => registration(email, password)}>Registration</button>
                <span>have account?</span>
                <NavLink to={'/login'}>Login</NavLink>
            </div>
        </div>
    );
};

export default Registration;