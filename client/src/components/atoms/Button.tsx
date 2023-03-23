import React from "react";
import { ClipLoader } from "react-spinners";
import { ButtonProps, ParentComponent } from "../../types/Props";

const buttonType = {
  btn1: "bg-gradient-to-r text-white from-button-grad1 to-button-grad2 border-transparent hover:border-orange hover:from-orange-400 hover:to-orange-600 ",
  btn2: "bg-gray-200  hover:bg-gray-300 text-black",
};

const buttonDefaultStyle = {
  base: "transition-colors duration-150 border rounded-lg ",
};

const Button = ({
  className,
  children,
  loading = false,
  disableWhenLoading = false,
  disabled,
  LoadingIcon = <ClipLoader size={18} color={ "fff"} />,
  styleType = "btn1",
  classNames,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={[
        buttonDefaultStyle.base || classNames?.base,
        buttonType[styleType],
        className,
      ].join(" ")}
      
      disabled={(disableWhenLoading && loading)|| disabled}
      {...rest}
    >
      {loading ? (
        <div className="h-full flex items-center ">
          {  LoadingIcon }
        </div>
      ): children}
    </button>
  );
};

export default Button;
