/* eslint-disable react/prop-types */
import React, { useEffect,useState } from 'react';
import { Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { clearToken } from '../../store';
import { useDispatch } from 'react-redux';

const PrivateRoute = ({  children }) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const [isAuthenticated,setIsAuthenticated] = useState(null);

    useEffect(() => {
        console.log(`token:${token}`);
        if(token){
            // console.log(`"decode:"${jwtDecode(token).data}`);
            let tokenExpiration = jwtDecode(token).exp;
            let dateNow = new Date();
            // console.log(tokenExpiration);
            // console.log(dateNow.getTime()/1000);
            if(tokenExpiration < dateNow.getTime()/1000){
                dispatch(clearToken());
                setIsAuthenticated(false)
            }else{
                setIsAuthenticated(true)
            }
        } else {
            dispatch(clearToken());
            setIsAuthenticated(false)
        }
    }, [token,dispatch])
    
    if (isAuthenticated === false) {
        localStorage.removeItem("Token");
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