// src/services/authService.ts
import axiosInstance from "../../core/instant_service/instant_service";
import axios from 'axios';

interface LoginPayload {
  email: string;
  password: string;
}
interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}


const AuthService = {
  login: async (payload: LoginPayload)=> {
    try{
      console.log(payload);
    const response = await axiosInstance.post("/auth/login", payload);
    console.log(response);
    if(response.status==200)
        {
          console.log(response);
            localStorage.setItem("authToken", response.data.token); 
            return "success";
        }
        return "Login Fail";
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400) {
  
            console.log("Error 400:",  data.message);
            return data.message;
          }
        } else {
  
          return "some thing went wrong";
        }
      } else {
        return "Unexpected error";
      }
      
      return "Login Fail";
    }
  },

  register: async (payload: RegisterPayload)=> {
    try{
    const response = await axiosInstance.post("/auth/register", payload);
    if(response.status==200)
    {
        return "success";
    }
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const { status, data } = error.response;

          if (status === 400) {
  
            
            return data.message;
          }
        } else {
  
         return "Network error:"
        }
      } else {
        return "Unexpected error:";
      }
      return "Register Failure";
    }
  
  },

  logout: () => {
    localStorage.removeItem("authToken"); 

  },

};

export default AuthService;
