import { clearToken,clearUserData } from "../store";
import { userApi } from "../store/apis/userApi";
import { useDispatch } from "react-redux";

function useClearUserToken(){
    const dispatch = useDispatch();
    const clear = () => {
        dispatch(clearToken());
        dispatch(clearUserData());
        localStorage.removeItem('Token');
        dispatch(userApi.util.resetApiState());
    }

    return{
        clear
    }
}

export default useClearUserToken;