import { ArrowDownIcon } from "@/assets/icons/ArrowDownIcon";
import React, { useState } from "react";

type Props = {
  height: number;
  width: number;
  liste: any[];
};

export default function DropdownMenu({ width, height, liste }: Props) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const menuHeight = liste.length * 30 >= 210 ? 210 : "auto";

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setMenuOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="inline-block text-left">
        <button
          type="button"
          className="my-2 py-3 text-black border border-black focus:outline-none w-full"
          onClick={toggleMenu}
        >
          <div className="flex flex-row justify-between items-center px-1">
            <div
              className="flex items-center justify-center capitalize w-full"
              style={{height: height }}
            >
              {selectedOption}
            </div>
            <ArrowDownIcon />
          </div>
        </button>
        {isMenuOpen && (
          <div
            className="flex items-start justify-end origin-center absolute z-5  overflow-auto shadow-lg bg-white ring-1"
            style={{ width: "auto", height: menuHeight }}
          >
            <div
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {liste.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center justify-start cursor-pointer p-2 mx-2 hover:text-gray-300 capitalize md:w-[75vw] w-[60vw]"
                  
                  role="menuitem"
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
