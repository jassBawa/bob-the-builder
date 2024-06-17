import * as React from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.944 20c.61 0 1.171-.329 1.47-.86.316-.562.281-1.255-.187-1.698C17.221 16.488 15.106 15 11.708 15c-3.392 0-5.403 1.483-6.346 2.436-.444.45-.461 1.129-.151 1.68M11.82 11.111a3.556 3.556 0 1 0 0-7.111 3.556 3.556 0 0 0 0 7.111Z"
    />
  </svg>
);
export default SvgComponent;
