import { apiConnector } from "../apiConnector";
import { authEndPoints } from "../api";
import { setLoading, setToken, setUserDetails } from "../../Reducer/Slice/userSlice";
import { toast } from "react-toastify";

const { SIGNUP_API, LOGIN_API } = authEndPoints;


export function Signup(username, fullName, password, confirmPassword, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector({
                method: "POST",
                url: SIGNUP_API,
                bodyData: {
                    username,
                    fullName,
                    password,
                    confirmPassword
                }
            });

            console.log("signup response", response)
            
            if (response.status === 200 && response.data.success) {
                toast.success("Registered Successfully");
                console.log("Registered Successfully");
                localStorage.setItem("token", response?.data?.token);
                localStorage.setItem("user",JSON.stringify(response.data.payload) )
                dispatch(setToken(response.data.token));
                dispatch(setUserDetails(response.data.payload));
            }

        } catch (err) {
            if (err.response) {
                const status = err.status;
                const message = err.response.data.message;

                if (status === 409) {
                    console.log(status,":User Already exists");
                } else if (status === 403) {
                    console.log("All fields are required");
                } else if (status === 402) {
                    console.log("Password does not match");
                } else {
                    console.log("Error occurred:", message || "Something went wrong");
                }
            } else {
                console.log("Network error or unknown error", err.message);
            }
        }
        dispatch(setLoading(false));
    };
}

export function Login(username, password){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response = await apiConnector({
                method : "POST",
                url: LOGIN_API,
                bodyData:{
                    username,
                    password
                }
            });

            console.log("Login response", response);

            if (response.status === 200 && response.data.success) {
                console.log("Login Successfully", response.data.token,response.data.payload  );
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user",JSON.stringify(response.data.payload) )
                dispatch(setToken(response.data.token));
                dispatch(setUserDetails(response.data.payload));

                toast.success("Login Successfully")
            }
        }
        catch(err){
            if(err.response){
                if(err.status === 403){
                    console.log("All fields are required.")
                }
                else if(err.status === 402){
                    console.log("Password do not match.");
                }
                else{
                    console.log("Error occurred:", err.response.data.message )
                }
            }
            else{
                console.log("Network error or unknown error", err.message);
            }
        }
        dispatch(setLoading(false));
    }
}

export function logout(navigate){
    return(dispatch)=>{
        dispatch(setToken(null));
        dispatch(setUserDetails(null));
        localStorage.clear();
        navigate("/");
    }
}
