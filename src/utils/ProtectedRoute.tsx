import React, { Children, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserAuth,  } from "../context/AuthContext";
import { Loader } from "@mantine/core";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export interface IAuthRouteProps {children: React.ReactNode}

const ProtectedAuth: React.FunctionComponent<IAuthRouteProps> = (props) => {
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const AuthCheck = onAuthStateChanged(auth, (user) => {
          if (user) {
              setLoading(false);
          } else {
              console.log('unauthorized');
              navigate('/landing');
          }
      });

      return () => AuthCheck();
  }, [auth]);

  if (loading) return <p></p>;

  return <>{children}</>

};


export default ProtectedAuth;
