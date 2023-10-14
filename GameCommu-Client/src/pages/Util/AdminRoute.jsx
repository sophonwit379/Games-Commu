import React, { useEffect,useState } from 'react';
import { Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { clearToken, useFetchUserQuery } from '../../store';
import { useDispatch } from 'react-redux';

const AdminRoute = ({  children }) => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const [isAuthenticated,setIsAuthenticated] = useState(null);
    const {data, isFetching} = useFetchUserQuery();
    let roll;

    useEffect(() => {
        console.log(`token:${token}`);
        if(token){
            let tokenExpiration = jwtDecode(token).exp;
            let dateNow = new Date();
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

    if(!isFetching){
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
        }else if(data.roll !== "Admin"){
            toast.error('Permission Denied', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                progress: undefined,
                theme: "light",
            });
            return <Navigate to="/home" />;
        }
    }
    return children;
}
export default AdminRoute;