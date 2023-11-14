import React, { forwardRef, CSSProperties } from "react";
import classNames from "classnames";

import styles from "./Action.module.css";

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: CSSProperties["cursor"];
}

export const Action = forwardRef<HTMLButtonElement, Props>(
  function ActionButton({ active, className, cursor, style, ...props }, ref) {
    return (
      <button
        type={"button"}
        ref={ref}
        {...props}
        tabIndex={0}
        className={classNames(styles.Action, className)}
        style={
          {
            ...style,
            cursor,
            "--fill": active?.fill,
            "--background": active?.background,
          } as CSSProperties
        }
      />
    );
  }
);
