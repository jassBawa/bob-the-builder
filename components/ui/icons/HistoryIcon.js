import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="currentColor"
        d="M6.344 6.344 5.28 5.28C4.81 4.81 4 5.144 4 5.81V9.25c0 .416.334.75.75.75h3.44a.751.751 0 0 0 .532-1.281l-.963-.963A6.002 6.002 0 0 1 18 12a6.002 6.002 0 0 1-9.427 4.925 1.002 1.002 0 0 0-1.394.247 1 1 0 0 0 .247 1.394A7.996 7.996 0 0 0 12 20a8 8 0 0 0 8-8A8 8 0 0 0 6.344 6.344ZM12 8a.748.748 0 0 0-.75.75V12c0 .2.078.39.219.531l2.25 2.25a.75.75 0 0 0 1.06-1.06l-2.032-2.03V8.75a.748.748 0 0 0-.75-.75H12Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="currentColor" d="M4 4h16v16H4z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgComponent;
