"use client";

import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="relative w-full bg-[#fbc4e1] shadow-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span className="font-bold text-4xl text-[#720455]">PayMe</span>
        </div>
        <div className="hidden space-x-2 lg:block">
          <Link to="/signup">
            <button
              type="button"
              className="rounded-md bg-transparent px-3 py-2 text-lg font-semibold text-[#720455] hover:bg-[#F2AFEF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              Sign Up
            </button>
          </Link>
          <Link to="signin">
            <button
              type="button"
              className="rounded-md border border-[#720455] px-3 py-2 text-lg font-semibold text-[#720455] hover:bg-[#F2AFEF] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
