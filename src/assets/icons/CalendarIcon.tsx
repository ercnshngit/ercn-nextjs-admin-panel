import * as React from "react";
import { memo } from "react";
const SvgComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none">
    <path
      fill={props.fill ? props.fill : "#6C7C93"}
      d="M.304.68C.407.268.784 0 1.208 0H18.78c.43 0 .812.275.914.694C19.833 1.27 20 2.135 20 3v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3C0 2.096.164 1.244.304.68Z"
    />
    <path
      fill={props.fill ? props.fill : "#6C7C93"}
      fillRule="evenodd"
      d="M19.619 8.838A.964.964 0 0 0 18.652 8H1.347a.964.964 0 0 0-.966.838A50.088 50.088 0 0 0 0 15v3.002C0 19.105.895 20 2 20h16c1.105 0 2-.894 2-1.998V15c0-2.734-.234-5.001-.381-6.162ZM17 13a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-2Z"
      clipRule="evenodd"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export { Memo as CalendarIcon };