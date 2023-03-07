// import { ComponentType } from "react";
// import { useQuery } from "react-query";
// import { Navigate } from "react-router-dom";

// import logo from "../../assets/logo.png"

// const ProtectedRoute = (WrappedComponent : ComponentType) => {
  
//     const WithAuthCheck = () => {
//       const { isSuccess, isLoading } = useQuery("init", checkAuth);
  
//       if (isLoading) {
//         return (
//           <div className="w-screen h-screen flex items-center justify-center">
//             <img src={logo} alt="logo" className="w-6 aspect-square md:w-10 " />
//           </div>
//         );
//       }
//       if (!isSuccess) {
//         return <Navigate to={"/login"} />;
//       }
  
//       return  <WrappedComponent/>;
//     }


//     return (<WithAuthCheck/>) 
  
// };

// export default ProtectedRoute;
