import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#2B3345"
      fillRule="evenodd"
      d="M10 1.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5ZM.25 10C.25 4.615 4.615.25 10 .25s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S.25 15.385.25 10ZM10 9.25a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V10a.75.75 0 0 1 .75-.75ZM10 6a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H10Z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgComponent;
