import { Toaster } from "react-hot-toast";
import { ParentComponent } from "../types/Props";
import Navbar from "./Navbar";

interface LayoutProps extends ParentComponent {
  withNavbar?: boolean;
}

const MainLayout = ({ children, withNavbar = true }: LayoutProps) => {
  return (
    <>
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
      <div className="w-[22rem] h-[14rem] rounded-full bg-blue-400/40 blur-3xl absolute -left-36 top-[40vh] z-0"></div>
      <div className="w-[10rem] h-[14rem] rounded-full bg-blue-400/50 blur-3xl absolute right-0 -top-4 z-0"></div>

      <div className=" max-w-[1620px] z-[1] relative  mx-auto ">
        {withNavbar && <Navbar />}
        <div className="flex mx-5 ">{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
