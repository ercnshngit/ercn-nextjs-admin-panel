import * as React from "react";
import { memo } from "react";
const SvgComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={20} fill="none">
    <path
      stroke={props.fill ? props.fill : "#6C7C93"}
      strokeLinecap="round"
      strokeWidth={2}
      d="m1.945 13.038 8.467 5.78c.353.24.823.24 1.176 0l8.467-5.78"
    />
    <path
      fill={props.fill ? props.fill : "#6C7C93"}
      d="M1.953 5.96 10.42.18a1.047 1.047 0 0 1 1.176 0l8.467 5.78a.986.986 0 0 1 0 1.639l-8.467 5.779a1.047 1.047 0 0 1-1.176 0l-8.467-5.78a.986.986 0 0 1 0-1.638Z"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export { Memo as CategoryIcon };