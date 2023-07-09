import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

type props = {
  component: any;
  path: string;
};

const AdminRoute: React.FC<props> = ({ component: Component, ...rest }) => {
  // Redux State
  const { user_detail } = useSelector((state: any) => state.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        user_detail !== null && user_detail.role !== "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default AdminRoute;
