import * as React from "react";
import { memo } from "react";

const SvgComponent = (props: any) => (
  <svg
    width={16}
    height={10}
    viewBox="0 0 16 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.9597 1L1.04031 1C0.621059 1 0.387973 1.48497 0.649879 1.81235L7.60957 10.512C7.80973 10.7622 8.19027 10.7622 8.39044 10.512L15.3501 1.81235C15.612 1.48497 15.3789 1 14.9597 1Z"
      fill="#3B3551"
      stroke="#3B3551"
      stroke-linejoin="round"
    />
  </svg>
);

const Memo = memo(SvgComponent);

export { Memo as ArrowDownIcon };
