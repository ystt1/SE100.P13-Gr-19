import React, { useState } from "react"; 
import { InputField } from "./component/input_field";
// import picture from "../../assets/auth_picture.png";
import AuthService from "../../data/service/auth_service";
import { useSnackbar } from "../../components/NotificationBat";

export const LoginForm: React.FC = () => {
  const { showSnackbar } = useSnackbar();
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response= await AuthService.login({ email, password });
    console.log(response);
    if(response=="success")
    {

      window.location.href = "/quiz";
    }
    else
    {
      showSnackbar(response);
    }
  };

  const handleRegister = () => {
    window.location.href = "/register";
  };

  const handleForgotPassword = () => {
    window.location.href = "/forgot-password";
  };

  return (
    <div className="flex items-center justify-enter h-screen pr-20">
      <div className="flex items-center space-x-10 w-full max-w-[1400px]">
        <div className="hidden md:block w-1/2 mr-auto">
          <img src={"picture"} alt="Login Illustration" className="w-full" />
        </div>


        
        <form
          onSubmit={handleSubmit}
          className="flex flex-col rounded-xl max-w-[300px] w-full ml-[-10px]"
        >
          <h1 className="self-start text-2xl font-bold text-blue-700">
            Login to your Account
          </h1>
          <p className="self-start text-sm leading-loose text-blue-700">
            with your registered Email Address
          </p>

          <div className="mt-5">
            <InputField
              label="Email address*"
              placeholder="Enter email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <InputField
              label="Enter password*"
              placeholder="Password"
              type="password"
              showPasswordToggle
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="px-8 py-3 w-full text-sm font-medium text-center text-white bg-blue-700 rounded-md"
            >
              Login
            </button>
          </div>

          <div className="flex flex-col items-center mt-6">
            <span className="text-gray-500 text-xs mb-2">or</span>
            <button
              type="button"
              onClick={handleRegister}
              className="px-8 py-3 w-full text-sm font-medium text-center text-blue-700 bg-white border border-blue-700 rounded-md hover:bg-blue-50"
            >
              Register
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs text-blue-700 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
