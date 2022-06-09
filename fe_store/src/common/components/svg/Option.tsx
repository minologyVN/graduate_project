import * as React from "react";
import { SVGProps } from "react";

const SvgOption = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    {...props}
  >
    <g stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd">
      <rect x="5" y="5" width="5" height="5" rx="1" fill="currentColor"></rect>
      <rect
        x="14"
        y="5"
        width="5"
        height="5"
        rx="1"
        fill="currentColor"
        opacity="0.3"
      ></rect>
      <rect
        x="5"
        y="14"
        width="5"
        height="5"
        rx="1"
        fill="currentColor"
        opacity="0.3"
      ></rect>
      <rect
        x="14"
        y="14"
        width="5"
        height="5"
        rx="1"
        fill="currentColor"
        opacity="0.3"
      ></rect>
    </g>
  </svg>
);

export default SvgOption;
