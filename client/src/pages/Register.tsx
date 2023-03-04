import { useState } from "react";
import MainLayout from "../layout/AuthedLayout";
import toast, {Toaster} from "react-hot-toast";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/atoms";
import { useMutation } from "react-query";
import { register } from "../api/Auth";
import { AxiosError, AxiosResponse } from "axios";
import { isNotEmpty, matches, useForm } from "@mantine/form";
import { PasswordInput, TextInput } from "@mantine/core";

const Register = () => {
  const registerVal = useForm({
    initialValues : {
      fn: "",
      ln: "",
      userName: "",
      password: "",
      passwordC :""
    },
    validateInputOnChange: true,
    validate : {
      fn: isNotEmpty("firstName can't be empty"),
      ln: isNotEmpty("lastName can't be empty"),
      userName: isNotEmpty("userName can't be empty"),
      password: matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,"Format Password is false"),
      passwordC : (value, values) =>  value !== values.password ? "Password did not match": null
    }
  })


  const {mutateAsync, isLoading} = useMutation(register); 


  const attemptRegister = (payload: any) => {
    
    toast.promise(mutateAsync(payload,{
      onSettled(){
        registerVal.reset();
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
          <form action="" className="flex flex-col gap-4 mt-10" onSubmit={registerVal.onSubmit((values) => attemptRegister({
            firstName:  values.fn,
            lastName: values.ln,
            userName: values.userName,
            password: values.password
          }))}>
            <div className="flex gap-2">
              <TextInput
                classNames={{input: "focus:border-orange ring-2 ring-transparent focus:ring-orange/20"}}
                placeholder="First name"
                {...registerVal.getInputProps("fn")}
              />
              <TextInput
                classNames={{input: "focus:border-orange ring-2 ring-transparent focus:ring-orange/20"}}
                placeholder="Last name"
                {...registerVal.getInputProps("ln")}
              />
            </div>
            <div>
              <TextInput
                classNames={{input: "focus:border-orange ring-2 ring-transparent focus:ring-orange/20"}}
                placeholder="username"
                {...registerVal.getInputProps("userName")}
              />
            </div>
            <div className="flex gap-2">
              <TextInput
                type={"password"}
                classNames={{input: "focus:border-orange ring-2 ring-transparent focus:ring-orange/20"}}
                placeholder="password"
                {...registerVal.getInputProps("password")}
              />
              <TextInput
                type={"password"}
                classNames={{input: "focus:border-orange ring-2 ring-transparent focus:ring-orange/20"}}
                placeholder="password confirm"
                {...registerVal.getInputProps("passwordC")}
              />
            </div>
            <div className="flex mt-4 justify-center items-center gap-4 ">
              <Link to={"/login"} className="text-sm text-blue-500 hover:underline">
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
