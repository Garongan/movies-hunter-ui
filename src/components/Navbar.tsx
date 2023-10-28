/**
 * this component is navbar
 * this component is mapping the array from parent
 * if you want the value of this navbar, you can change the array value from Home Page component
 * don't change this code, except you want to change the looks of this component
 */

import { NavbarInterface } from "@/services/types";
import React from "react";

interface NavbarProps {
  navbar: NavbarInterface[];
  onTitlePageClick: (name: NavbarInterface["name"]) => void;
  titlePage: string;
}

/**
 * 
 * @param navbar is variable to get array from parent component
 * @param onTitlePageClick is function if the user want to navigate other navbar button
 * @param titlePage is variable to show the navbar value from navbar array
 * @returns the mapping of navbar array
 */
export const Navbar: React.FC<NavbarProps> = ({
  navbar,
  onTitlePageClick,
  titlePage,
}) => {
  return navbar.map((item, index) => {
    return (
      <div className={`p-1.5 text-md ${titlePage == item.name ? 'activeNavbar' : ''}`} key={index}>
        <button onClick={() => onTitlePageClick(item.name)}>{item.name}</button>
      </div>
    );
  });
};
