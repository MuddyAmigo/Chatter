import { Navigate } from "react-router-dom";
import excludedRoutes from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";
import { authenticatedVar } from "../../constants/authenticated";
import { snackVar } from "../../constants/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../../constants/error";
import { usePath } from "../../hooks/usePath";
import { useEffect } from "react";

interface GuardProps {
  children: JSX.Element;
}

const Guard = ({ children }: GuardProps) => {
  const { data: user, error, loading } = useGetMe();
  const { path } = usePath();

  useEffect(() => {
    if (user) {
      authenticatedVar(true);
    }
  }, [user]);

  useEffect(() => {
    if (error?.networkError) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
    }
  }, [error]);

  if (loading) return null;

  // If the route is excluded (like /login or /signup), just render children
  if (excludedRoutes.includes(path)) return children;

  // If not authenticated, redirect to /login
  if (!user?.me) return <Navigate to="/login" replace />;

  // If authenticated, render children
  return children;
};

export default Guard;