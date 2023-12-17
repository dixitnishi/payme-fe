import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const email = useRef();
  const passwordExtracted = useRef();

  async function handleLogin() {
    const emailValue = email.current.value;
    const passwordValue = passwordExtracted.current.value;
    try {
      const requestJson = {
        email: emailValue,
        password: passwordValue,
      };

      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestJson),
      });
      const responseData = await response.json();
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("accountId", responseData.accountId);
      if (localStorage.getItem("token")) {
        login();
      }
      navigate("/wallet");
    } catch (error) {
      // Add component which creates a dialogbox which basically depicts the
      console.log(error);
    }
  }

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <Link to="/">
              <h1 className="text-4xl font-bold leading-tight text-black">
                PayMe
              </h1>
            </Link>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your wallet
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Don&apos;t have an wallet?
            <Link
              to="/signup"
              className="font-semibold text-black transition-all duration-200 hover:underline ml-1">
              Create a free wallet
            </Link>
          </p>
          <form>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900">
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    ref={email}
                    placeholder="Email"></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900">
                    {" "}
                    Password{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    ref={passwordExtracted}
                    placeholder="Password"></input>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80">
                  Sign In <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
