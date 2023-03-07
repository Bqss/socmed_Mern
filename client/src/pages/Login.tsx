import MainLayout from "../layout/AuthedLayout";
import toast from "react-hot-toast";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/atoms";
import { useMutation } from "react-query";
import { login } from "../api/services/Auth";
import { isNotEmpty, useForm } from "@mantine/form";
import { TextInput } from "@mantine/core";

import GuestLayout from "../layout/GuestLayout";



const Login = () => {
  const navigate = useNavigate();
  const test = useForm({
    initialValues: {
      userName: "",
      password: "",
    },
    validateInputOnChange: true,
    validate: {
      userName: isNotEmpty("Username can't be empty"),
      password: isNotEmpty("Password can't be empty"),
    },
  });
  const { mutate: tryLogin } = useMutation(login, {
    onSuccess() {
      navigate("/",{replace: true});
    },
    onError(error: any) {
      switch (error.response.status) {
        case 400:
          test.setErrors({ password: error.response.data });
          break;
        case 404:
          test.setErrors({ userName: error.response.data });
          break;
      }
      toast.error(error.response.data, {
        duration: 3000,
      });
      
    },
  });

  return (
    <GuestLayout >
      
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
        <div className="flex flex-col items-center basis-96 bg-white py-8 px-6 rounded-lg shadow-md ">
          <span className="text-2xl font-bold block ">Sign in</span>
          <form
            action=""
            className="w-full flex flex-col gap-6  mt-10"
            onSubmit={test.onSubmit((values) => tryLogin(values))}
          >
            <TextInput
              classNames={{input: "focus:border-orange ring-2 ring-transparent focus:ring-orange/20 mt-1"}}
              placeholder="username"
              label="Username"
              {...test.getInputProps("userName")}
            />
            <TextInput
              placeholder="password"
              classNames={{input: "focus:border-orange ring-2 ring-transparent focus:ring-orange/20 mt-1"}}
              type={"password"}
              label="password"
              {...test.getInputProps("password")}
            />

            <div className="flex mt-4 justify-center items-center gap-4 ">
              <Link to={"/register"} className="text-sm text-blue-500 hover:underline">
                Don't have an account ?
              </Link>
              <Button
                className="px-6 py-2 rounded-md font-medium"
                type="submit"
              >
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Login;
