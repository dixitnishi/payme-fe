import { React, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ErrorBox from "../Error/ErrorBox";
import { useAuth } from "../../utils/AuthContext";

export function Signup() {
  const email = useRef();
  const name = useRef();
  const passwordEntered = useRef();
  const confirmPasswordEntered = useRef();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [signUpStatus, setSignUpStatus] = useState(null);

  async function handleSignup() {
    setSignUpStatus(null);

    if (name.current.value.length <= 4) {
      setSignUpStatus(
        "Please enter a name having atleast 5 characters. Thanks!"
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.current.value)) {
      setSignUpStatus("Please enter a valid email address.");
      return;
    }
    const passwordRegex =
      /^(?!.*\s)(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,})$/;
    const isPasswordValid = passwordRegex.test(passwordEntered.current.value);

    if (!isPasswordValid) {
      setSignUpStatus(
        "Password must be at least 8 characters long and include one uppercase letter, one number, and one special character."
      );
      return;
    }

    if (
      passwordEntered.current.value !== confirmPasswordEntered.current.value
    ) {
      setSignUpStatus("Passwords do not match.");
      return;
    }

    try {
      const requestJson = {
        email: email.current.value,
        password: passwordEntered.current.value,
        name: name.current.value,
      };

      const response = await fetch(
        "http://localhost:8080/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestJson),
        }
      );
      const responseData = await response.json();

      if (response.status === 200) {
        setSignUpStatus("Success");
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("accountId", responseData.accountNo);
        if (localStorage.getItem("token")) {
          login();
        }
        navigate("/wallet");
      } else {
        setSignUpStatus(
          responseData.message || "An error occurred during signup."
        );
      }

      email.current.value = "";
      passwordEntered.current.value = "";
      name.current.value = "";
      confirmPasswordEntered.current.value = "";
    } catch (error) {
      setSignUpStatus("Network error. Please try again later.");
    }
  }

  return (
    <section className="min-h-screen">
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
            Sign up to create wallet
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an wallet?{" "}
            <Link
              to="/signin"
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <form className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Name{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    ref={name}
                    id="name"
                  ></input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    ref={email}
                    placeholder="Email"
                    id="email"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    {/* To do implement routing, then use Link provided from react router dom and redirect to the login page  */}
                    Password{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    ref={passwordEntered}
                    placeholder="Password"
                    id="password"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Confirm Password{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    ref={confirmPasswordEntered}
                    placeholder="Confirm Password"
                    id="password"
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleSignup}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Create Wallet <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
              {signUpStatus && <ErrorBox message={signUpStatus} />}
            </div>
          </form>
          <p className="mt-2 text-center text-sm text-gray-600">
            <Link
              to="/"
              className="text-gray-600 transition-all duration-200 ml-1 text-lg"
            >
              Go to homepage
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
