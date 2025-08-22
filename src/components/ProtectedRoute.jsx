import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>; // show spinner or skeleton
  }

  return isSignedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
