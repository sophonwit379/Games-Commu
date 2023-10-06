/* eslint-disable react/prop-types */
import React, { useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
const PrivateRoute = ({  children }) => {
    const token = localStorage.getItem('Token')
    const [isAuthenticated,setIsAuthenticated] = useState(null);
    useEffect(() => {
        console.log(`"token:"${token}`);
        if(token){
            let tokenExpiration = jwtDecode(token).exp;
            let dateNow = new Date();
            console.log(tokenExpiration);
            console.log(dateNow.getTime()/1000);
            if(tokenExpiration < dateNow.getTime()/1000){
                setIsAuthenticated(false)
            }else{
                setIsAuthenticated(true)
            }
        } else {
            setIsAuthenticated(false)
        }
    }, [token])
    
    if (isAuthenticated === false) {
        toast.error('กรุณาล็อกอิน', {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            progress: undefined,
            theme: "light",
        });
        return <Navigate to="/login" />;
    }

    return children;
}
export default PrivateRoute;