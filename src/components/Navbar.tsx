import { NavbarInterface } from "@/services/types";
import React from "react";

interface NavbarProps {
  navbar: NavbarInterface[];
  onTitlePageClick: (name: NavbarInterface["name"]) => void;
  titlePage: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  navbar,
  onTitlePageClick,
  titlePage,
}) => {
  return navbar.map((item, index) => {
    return (
      <div className={`text-sm font-medium p-1.5 ${titlePage == item.name ? 'activeNavbar' : ''}`} key={index}>
        <button onClick={() => onTitlePageClick(item.name)}>{item.name}</button>
      </div>
    );
  });
};
