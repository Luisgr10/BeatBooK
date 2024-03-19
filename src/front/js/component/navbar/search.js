import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";
import "./search.css";

export const Search = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOutsideMousedown = (event) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <div
        className={`overlay ${isOpen ? "show" : ""}`}
        onMouseDown={handleOutsideMousedown}
      ></div>
      <div style={{ position: "relative" }}>
        <SearchBar setIsOpen={setIsOpen} />
        <SearchResults isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};