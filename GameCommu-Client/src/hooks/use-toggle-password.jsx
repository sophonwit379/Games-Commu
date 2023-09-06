import { useState } from "react";

function useTogglePassword (){
    const [showPwd,setShowPwd] = useState(false);
    const togglePwd = () => {
    setShowPwd(!showPwd);
    }

    return {
        showPwd,
        togglePwd,
    }
}

export default useTogglePassword;
