import React, { useContext, useState } from "react";
import "./Loading.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../AuthProvider/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Login = () => {
  const [error, setError] = useState("");
  const { loginWithEmailAndPass, signUpWithGoogle } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    loginWithEmailAndPass(email, password)
      .then((result) => {
        if (!result.user.emailVerified) {
          toast.info("🦄 Please verify your email!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          const err = {
            message: "Please varify your email",
          };
          throw new Error(err.message);
        }
        toast.success("🦄 SignUp successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate(location?.state?.from?.pathname || "/");
        }, 4000);
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  // Signup wuth google fuction
  const handleSignUpWithGoogle = (event) => {
    event.preventDefault();
    signUpWithGoogle()
      .then(() => {
        toast.info("🦄 SignUp successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          <Navigate to={"/login"}></Navigate>;
        }, 3000);
      })
      .catch((err) => setError(err.message));
  };
  return (
    <div className="login-field">
      <h3 className="text-3xl font-semibold text-center my-4">SignIn</h3>
      <form onSubmit={handleSignIn}>
        <div className="flex flex-col">
          <label htmlFor="email" className="pb-1">
            Email
          </label>
          <input required type="email" name="email" id="inp" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="pb-1">
            password
          </label>
          <input required type="password" name="password" id="inp" />
        </div>
        <p className="text-red-400">
          <small>{error && error + "*"}</small>
        </p>
        <div className="">
          <button type="submit" className="log-btn">
            Login
          </button>
        </div>
        <ToastContainer />
      </form>
      <p className="text-center">
        New to ema-john? <Link to="/register">Please register</Link>{" "}
      </p>
      <Link>
        <button onClick={handleSignUpWithGoogle} id="googleSignIn">
          <FontAwesomeIcon icon={faGoogle} /> Signin with google
        </button>
      </Link>
    </div>
  );
};

export default Login;
