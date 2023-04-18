import {React} from 'react';
import '../../styles/navbar.scss'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../../reducers/userReducer'
import avatarLogo from '../../assets/avatar.svg'
import {API_URL} from '../../config'
import {NavLink} from 'react-router-dom'

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const currentDir = useSelector(state => state.files.currentDir)
    const currentUser = useSelector(state => state.user.currentUser)
    const name = useSelector(state => state.user.name)
    const dispatch = useDispatch()
    const avatar = currentUser.avatar ? `${API_URL + currentUser.avatar}` : avatarLogo

    return (
        <div className={'navbar'}>
            <div className={'logo'}>
                <div className={'logo_title'}>Simple Cloud Storage</div>
            </div>
            <div className={'navbar_btn'}>
                {isAuth && <a href={''} className={'navbar_auth'} onClick={() => dispatch(logout())}>Logout</a>}
                {isAuth && <NavLink to={'/profile'} className="avatar"> <img src={avatar} alt=""/> </NavLink>}
            </div>
        </div>
    );
};

export default Navbar;