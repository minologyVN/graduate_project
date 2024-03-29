import * as React from "react";
import { SVGProps } from "react";

const SvgOrder = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="sc-gsDKAQ erBbkF"
    {...props}
  >
    <path
      d="M9 10C8.44772 10 8 10.4477 8 11C8 11.5523 8.44772 12 9 12H15C15.5523 12 16 11.5523 16 11C16 10.4477 15.5523 10 15 10H9Z"
      fill={props.color || "#494949"}
    ></path>
    <path
      d="M8 7C8 6.44772 8.44772 6 9 6H11C11.5523 6 12 6.44772 12 7C12 7.55228 11.5523 8 11 8H9C8.44772 8 8 7.55228 8 7Z"
      fill={props.color || "#494949"}
    ></path>
    <path
      d="M9 14C8.44772 14 8 14.4477 8 15C8 15.5523 8.44772 16 9 16H12C12.5523 16 13 15.5523 13 15C13 14.4477 12.5523 14 12 14H9Z"
      fill={props.color || "#494949"}
    ></path>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 21C20 21.3565 19.8102 21.686 19.5019 21.8649C19.1936 22.0438 18.8134 22.0451 18.5039 21.8682L15.5 20.1518L12.4961 21.8682C12.1887 22.0439 11.8113 22.0439 11.5039 21.8682L8.5 20.1518L5.49614 21.8682C5.18664 22.0451 4.80639 22.0438 4.49807 21.8649C4.18976 21.686 4 21.3565 4 21V5C4 3.34315 5.34315 2 7 2H17C18.6569 2 20 3.34315 20 5V21ZM6 19.2768L8.5 17.8482L12 19.8482L15.5 17.8482L18 19.2768V5C18 4.44772 17.5523 4 17 4H7C6.44772 4 6 4.44772 6 5V19.2768Z"
      fill={props.color || "#494949"}
    ></path>
  </svg>
);

export default SvgOrder;
