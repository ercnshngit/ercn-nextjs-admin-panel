import * as React from "react";
import { memo } from "react";
const SvgComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none">
    <path
      fill={props.fill ? props.fill : "#6C7C93"}
      d="M0 1a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1ZM15 1a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V1ZM20 19a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v5ZM5 19a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5Z"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export { Memo as DashboardIcon };