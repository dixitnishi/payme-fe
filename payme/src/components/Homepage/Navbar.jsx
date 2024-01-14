"use client";

import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span className="font-bold text-2xl">PayMe</span>
        </div>
        <div className="hidden space-x-2 lg:block">
          <Link to="/signup">
            <button
              type="button"
              className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              Sign Up
            </button>
          </Link>
          <Link to="signin">
            <button
              type="button"
              className="rounded-md border border-black px-3 py-2 text-sm font-semibold hover:bg-black/25 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
