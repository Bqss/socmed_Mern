import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import toast, {Toaster} from "react-hot-toast";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/atoms";
import { useMutation } from "react-query";
import { register } from "../api/Auth";
import { AxiosError, AxiosResponse } from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [fn, setFn] = useState("");
  const [ln, setLn] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordC, setPasswordC] = useState("");

  const {mutateAsync, isLoading} = useMutation(register); 


  const attemptRegister = (ev: React.FormEvent) => {
    ev.preventDefault();
    toast.promise(mutateAsync({
      firstName : fn,
      lastName: ln,
      userName: username,
      password
    },{
      onSettled(){
        setUsername("");
        setPassword("");
        setPasswordC("");
        setFn("")
        setLn("")
      }
    }),{
      success : (data) => data ,
      loading : "registering..",
      error: ( err : AxiosError) => `error ${err.response?.data}`
    })
    
  }
  
  return (
    <MainLayout withNavbar={false}>
      
      <div className="w-full flex items-center h-screen justify-center space-x-10">
        <div className="flex items-center gap-4">
          <img src={logo} alt="" />
          <div>
            <span className="text-5xl font-bold text-transparent bg-clip-text  bg-gradient-to-r from-button-grad1 to-button-grad2">
              Bass Media
            </span>
            <p className="font-bold text-xl mt-2">
              Explore the ideas throughout the world
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center  bg-white py-8 px-6 rounded-lg shadow-md ">
          <span className="text-2xl font-bold block ">Sign Up</span>
          <form action="" className="flex flex-col gap-4 mt-10" onSubmit={attemptRegister}>
            <div className="flex gap-2">
              <input
                type="text"
                name="fn"
                id="fn"
                value={fn}
                onChange={(ev)=> setFn(ev.target.value)}
                className="bg-gray-100 border focus:border-orange transition-colors duration-150 px-5 py-2 rounded-md"
                placeholder="First Name"
              />
              <input
                type="text"
                name="ln"
                value={ln}
                onChange={(ev)=> setLn(ev.target.value)}
                id="ln"
                className="bg-gray-100 border focus:border-orange transition-colors duration-150 px-5 py-2 rounded-md"
                placeholder="Last Name"
              />
            </div>
            <div>
              <input
                type="text"
                name=""
                id=""
                value={username}
                onChange={(ev)=> setUsername(ev.target.value)}
                className="w-full bg-gray-100 border focus:border-orange transition-colors duration-150 px-5 py-2 rounded-md"
                placeholder="Username"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="password"
                name="pw"
                value={password}
                onChange={(ev)=> setPassword(ev.target.value)}
                id="pw"
                className="bg-gray-100 border focus:border-orange transition-colors duration-150 px-5 py-2 rounded-md"
                placeholder="Password"
              />
              <input
                type="password"
                name="pwc"
                value={passwordC}
                onChange={(ev)=> setPasswordC(ev.target.value)}
                id="pwc"
                className="bg-gray-100 border focus:border-orange transition-colors duration-150 px-5 py-2 rounded-md"
                placeholder="Password Confirm"
              />
            </div>
            <div className="flex mt-4 justify-center items-center gap-4 ">
              <Link to={"/login"} className="text-blue-500 hover:underline">
                Already have an account ?
              </Link>
              <Button className="px-6 py-2 rounded-md font-medium" disabled={isLoading}>
                Sign up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
