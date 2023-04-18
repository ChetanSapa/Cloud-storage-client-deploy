import {React, useEffect} from "react";
import Navbar from './navbar/Navbar'
import '../styles/app.scss'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Registration from './authorization/Registration'
import Authorization from './authorization/Authorization'
import Disc from './disc/Disc'
import Profile from '../components/profile/profile'
import {useSelector, useDispatch} from 'react-redux'
import {auth} from '../actions/user'

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
    }, [])


    return (
        <BrowserRouter>
            <div className={'app'}>
                <Navbar/>
                {!isAuth ?
                    <Routes>
                        <Route path={'/login'} exact element={<Authorization/>}/>
                        <Route path={'/registration'} element={<Registration/>}/>
                        <Route path="*" element={<Navigate to ="/login" />}/>
                    </Routes>:
                    <Routes>
                        <Route path={'/'} exact element={<Disc/>}/>
                        <Route path={'/profile'} exact element={<Profile/>}/>
                        <Route path="*" element={<Navigate to ="/" />}/>
                    </Routes>
                }
            </div>
        </BrowserRouter>
    );
}

export default App;
