import { ComponentType } from "react";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../../api/Auth";

const ProtectedRoute = (WrappedComponent : ComponentType) => {
  
    const WithAuthCheck = () => {
      const { isSuccess, isLoading } = useQuery("init", checkAuth, {
        refetchOnWindowFocus: false,
        retry: false
      });
  
      if (isLoading) {
        return <div>loading ...</div>;
      }
      if (!isSuccess) {
        return <Navigate to={"/login"} />;
      }
  
      return  <WrappedComponent/>;
    }


    return (<WithAuthCheck/>) 
  
};

export default ProtectedRoute;
