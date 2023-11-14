import React from "react";
import { forwardRef } from "react";

const InputElement = forwardRef<HTMLInputElement, any>(function InputElement({
  width,
  text,
  placeholder,
  label,
  setText,
  rounded,
  ...rest
}: any) {
  return (
    <div className="flex flex-col my-2">
      <p className="mb-2 font-sans text-xs">{label}</p>
      <input
        className={
          "border border-[#ccc] rounded-[5px] bg-white h-10 p-2 focus:outline text-xs "
        }
        type={"text"}
        placeholder={placeholder}
        onChange={setText}
        {...rest}
      />
    </div>
  );
});

export default InputElement;