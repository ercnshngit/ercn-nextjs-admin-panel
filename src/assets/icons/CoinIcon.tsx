import * as React from "react";
import { memo } from "react";
const SvgComponent = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none">
    <path
      fill={props.fill ? props.fill : "#6C7C93"}
      stroke={props.fill ? props.fill : "#6C7C93"}
      strokeWidth={2}
      d="m15.585 15.773.178-.052.148-.113L18 14.018V15.5c0 .631-.576 1.504-2.21 2.278C14.231 18.516 12.008 19 9.5 19s-4.732-.484-6.29-1.222C1.577 17.004 1 16.131 1 15.5v-1.232l2.02 1.845.208.19.276.054 5.806 1.125.237.046.232-.068 5.806-1.687Z"
    />
    <path
      stroke={props.fill ? props.fill : "#6C7C93"}
      strokeWidth={2}
      d="M4.436 9C2.35 9.707 1 10.84 1 12.118 1 14.262 4.806 16 9.5 16s8.5-1.738 8.5-3.882c0-.745-.46-1.442-1.258-2.033"
    />
    <path
      fill={props.fill ? props.fill : "#6C7C93"}
      stroke={props.fill ? props.fill : "#6C7C93"}
      strokeWidth={2}
      d="m16.486 8.15.222-.04.183-.132L19 6.455v1.778c0 .539-.535 1.36-2.192 2.105-1.563.702-3.792 1.162-6.308 1.162s-4.745-.46-6.308-1.162C2.535 9.594 2 8.772 2 8.233V6.65l1.523 1.283.208.175.27.046 6.333 1.066.174.03.173-.032 5.805-1.067Z"
    />
    <path
      stroke={props.fill ? props.fill : "#6C7C93"}
      strokeWidth={2}
      d="M19 4.5c0 .631-.576 1.504-2.21 2.278C15.231 7.516 13.008 8 10.5 8s-4.732-.484-6.29-1.222C2.577 6.004 2 5.131 2 4.5s.576-1.504 2.21-2.278C5.769 1.484 7.992 1 10.5 1s4.732.484 6.29 1.222C18.423 2.996 19 3.869 19 4.5Z"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export { Memo as CoinIcon };