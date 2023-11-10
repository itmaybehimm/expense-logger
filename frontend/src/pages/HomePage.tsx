import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { getUser } from "../features/authentication/loginThunk";
import { logOut } from "../features/authentication/authSlice";

const HomePage: React.FC = () => {
  const tokenAvailable = useAppSelector((state) => state.auth.tokenSuccess);
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokenAvailable) {
      navigate("/login");
      return;
    }

    dispatch(getUser(token))
      .unwrap()
      .then((data) => {
        if (!data.user.isVerified) {
          navigate("/otp_verification");
          return;
        }
      })
      .catch((error) => alert(error.error_data));
  }, [token, tokenAvailable, dispatch, navigate]);

  const handleLogout = (): void => {
    dispatch(logOut());
  };

  return (
    <div>
      <div>Hi {user.username}</div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;
