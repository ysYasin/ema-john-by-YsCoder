import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  const navigator = useNavigate();
  return (
    <div className="flex items-center justify-center flex-col mt-36 gap-5">
      <h1 className="text-4xl text-center">404</h1>
      <h2 className="text-4xl">Page Not Found</h2>
      <button
        onClick={() => navigator("/")}
        className="px-5 py-2 text-white bg-rose-600 rounded-md"
      >
        Home
      </button>
    </div>
  );
};

export default ErrorPage;
