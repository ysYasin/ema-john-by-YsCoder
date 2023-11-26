import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { UserContext } from "../../AuthProvider/AuthProvider";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [error, setError] = useState("");

  // useCFontext of Auth provider
  const { emailAndPasswordSignup, signUpWithGoogle } = useContext(UserContext);
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
  // handle signUp with password
  const handleSubmitWithEP = (event) => {
    setError("");
    event.preventDefault();
    //form
    const form = event.target;
    const email = form.email.value;
    const name = form.name.value;
    const password = form.password.value;
    const confirmP = form.confirm.value;

    if (confirmP !== password) {
      return setError("password does not match");
    } else if (password.length < 8) {
      return setError("Password must be at least 8 characters long");
    } else if (!email) {
      return setError("Email is required");
    } else if (!name) {
      return setError("Name is required");
    } else if (!password) {
      return setError("Password is required");
    } else if (!/[^a-zA-Z0-9\s]*[^a-zA-Z0-9\s]/.test(password)) {
      return setError(
        "Passwords should contain a number and special character"
      );
    }
    // SignUp prossecc
    emailAndPasswordSignup(email, password)
      .then((result) => {
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((err) => {
            setError(err.massege);
          });
        sendEmailVerification(auth.currentUser)
          .then(() => {
            toast.info("🦄 chack your email to varify!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          })
          .catch((err) => {
            console.log(err);
          });
        <Navigate to={"/login"}></Navigate>;
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <div>
      <div className="login-field">
        <h3 className="text-3xl font-semibold text-center my-4">SignUp</h3>
        <form onSubmit={handleSubmitWithEP}>
          <div className="flex flex-col">
            <label htmlFor="name" className="pb-1">
              Name
            </label>
            <input required type="text" name="name" id="inp" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="pb-1">
              Email
            </label>
            <input required type="email" name="email" id="inp" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="pb-1">
              Password
            </label>
            <input required type="password" name="password" id="inp" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirm" className="pb-1">
              Confirm password
            </label>
            <input required type="password" name="confirm" id="inp" />
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
          Allready have an account? <Link to="/login">Please Signin</Link>{" "}
        </p>

        <Link>
          <button onClick={handleSignUpWithGoogle} id="googleSignIn">
            <FontAwesomeIcon icon={faGoogle} /> Signin with google
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
