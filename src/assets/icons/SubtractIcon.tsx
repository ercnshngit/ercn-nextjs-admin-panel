import * as React from "react";
import { memo } from "react";
const SvgComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none">
    <path
      fill={props.fill ? props.fill : "#6C7C93"}
      fillRule="evenodd"
      d="M5.325 0C2.742 0 .523 1.684.264 4.254.114 5.742 0 7.644 0 10c0 2.356.113 4.258.264 5.746C.524 18.316 2.742 20 5.324 20h9.351c2.583 0 4.802-1.684 5.061-4.254.15-1.488.264-3.39.264-5.746 0-2.356-.113-4.258-.264-5.746C19.476 1.684 17.258 0 14.677 0H5.324Zm6.382 5.293a1 1 0 1 0-1.414 1.414l1.951 1.952a.2.2 0 0 1-.141.341H5a1 1 0 0 0 0 2h7.103a.2.2 0 0 1 .141.341l-1.951 1.952a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.414l-4-4Z"
      clipRule="evenodd"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export { Memo as SubstractIcon };