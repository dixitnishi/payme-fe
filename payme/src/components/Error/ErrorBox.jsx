import React from "react";

function ErrorBox({ message }) {
  return (
    <div
      className={
        message === "success"
          ? "text-green-800 bg-green-200 rounded-lg"
          : "text-red-800 bg-red-200 rounded-lg"
      }>
      <p className="p-4">{message}</p>
    </div>
  );
}

export default ErrorBox;
