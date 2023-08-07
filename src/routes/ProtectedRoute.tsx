import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

type props = {
  component: any;
  path: string;
};

const ProtectedRoute: React.FC<props> = ({ component: Component, ...rest }) => {
  const { user_detail } = useSelector((state: any) => state.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        user_detail !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default ProtectedRoute;
