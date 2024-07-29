import { getApiUrl } from './apiConfig'
import axios from 'axios'

export const submitLogin = (props) => {
    const { loginData, setWrongCredentials, navigate, setOpen } = props
    const loginUrl = getApiUrl('auth/login')
    axios.post(loginUrl, loginData, { withCredentials: true })
        .then(() => {
            navigate('/store', { replace: true })
        }).catch(error => {
            setWrongCredentials({ wrongData: true, infoText: error.response.data.infoMessage })
            setOpen(true)
        })
}

//separacion

export const submitRegister = (props) => {
    const { registerData, setRegisterData, setWrongData, setOpen } = props
    const registerUrl = getApiUrl('auth/register')
    axios.post(registerUrl, registerData).then(response => {
        setRegisterData({ userName: "", email: "", password: "" })
        setWrongData({ status: false, infoText: response.data.infoMessage })
        setOpen(true)
    }).catch(error => {
        console.log(error.response);
        setWrongData({ status: true, infoText: error.response.data.infoMessage })
        setOpen(true)
    })
}

//separacion

export const getUserDetails = ({ setUserRole }) => {
    const userDetailsUrl = getApiUrl('auth/details')
    axios.get(userDetailsUrl, { withCredentials: true }).then(userDetails => {
        setUserRole(userDetails.data.roles)
        const cartCountUrl = getApiUrl(`shoppingList/count/${userDetails.data.id}`)
        axios.get(cartCountUrl, { withCredentials: true }).then(response => {
            localStorage.setItem("number", response.data.toString())
            window.dispatchEvent(new Event('storage'))
        })
    }).catch(error => {
        if(error.response && error.response.status === 500){
            console.error("error gonzalo", error);
        }
        else{
            console.error("error 2 gonzalo", error);
        }
    })
}

//separacion

export const logout = ({ navigate }) => {
    const logoutUrl = getApiUrl('auth/logout')
    axios.get(logoutUrl, { withCredentials: true }).then(() => {
        navigate('/', { replace: true })
    })
}