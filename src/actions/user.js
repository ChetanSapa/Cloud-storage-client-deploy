import axios from 'axios'
import {setUser} from '../reducers/userReducer'
import {API_URL} from '../config'

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}api/auth/registration/`, {
                email,
                password
            },
            {
                headers: {Access-Control-Allow-Origin: `*`}
            })
        console.log(response.data.message)
    } catch (e) {
        console.log(e)
    }
}
export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/auth/login/`, {
                    email,
                    password
                },
                {
                    headers: {Access-Control-Allow-Origin: `*`}
                })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}
export const auth = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/auth/auth/`,
                {
                    headers: {
                        Authorization: `Bearer: ${localStorage.getItem('token')}`,
                        Access-Control-Allow-Origin: `*`
                    }
                }
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch
            (e) {
            console.log(e)
            localStorage.removeItem('token')
        }
    }

}
export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await axios.post(`${API_URL}api/files/avatar`, formData,
                {headers: {Authorization: `Bearer: ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }

}
export const deleteAvatar = () => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}api/files/avatar`,
                {headers: {Authorization: `Bearer: ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }

}