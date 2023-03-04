import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Background from "../components/mollecules/Background";
import { ParentComponent } from "../types/Props";

const GuestLayout = ({children}: ParentComponent) => {
  return (
    <>
      <Background />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          success: {
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "red",
              secondary: "white",
            },
          },
        }}
      />

      <div className=" max-w-[1620px] z-[1] relative  mx-auto ">
        <div className="flex mx-5 ">
          {children}
        </div>
      </div>
    </>
  );
};

export default GuestLayout;
