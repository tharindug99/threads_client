import React, { Fragment } from "react";

export default function Input({
  className,
  error,
  ...props
}: React.ComponentProps<"input"> & { error?: string }) {
  return (
    <Fragment>
      <input
        {...props}
        className={`border pr-5 pl-2 py-2 rounded-lg my-1 bg-gray-50 
        disabled:text-gray-400 disabled:cursor-not-allowed
        ${error ? "border-red-500" : ""} ${className}`}
      />
      <span className="text-xs text-red-500 text-right">{error}</span>
    </Fragment>
  );
}
