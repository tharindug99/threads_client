import React from "react";
import { useLottie } from "lottie-react";
import animationData from "../public/loading.json";

export default function Loading() {
  const { View } = useLottie({
    animationData: animationData,
    loop: true,
    className: "w-8 h-8",
  });

  return <div>{View}</div>;
}

import { SVGAttributes } from "react";

export const Spinner = ({
  className,
  ...props
}: SVGAttributes<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    className={`h-4 w-5 ${className}`}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    stroke="currentColor"
    {...props}
  >
    <circle
      cx="50"
      cy="50"
      fill="none"
      strokeWidth="5"
      r="35"
      strokeDasharray="164.93361431346415 56.97787143782138"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
      />
    </circle>
    <circle
      cx="50"
      cy="50"
      fill="none"
      strokeWidth="6"
      r="20"
      strokeDasharray="94.24777960769379 33.41592653589793"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1.2048192771084336s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
      ></animateTransform>
    </circle>
  </svg>
);
