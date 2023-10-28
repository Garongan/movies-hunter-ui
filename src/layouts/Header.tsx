/**
 * This component is layout for header
 * this layout has component navbar, search, and dark mode toggle
 * this layout is used for every pages rendering
 */

import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { NavbarInterface } from "@/services/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu } from "lucide-react";
import { FC, useEffect, useState } from "react";
import ModeToggle from "@/components/ModeToggle";
import { Search } from "@/components/Search";

interface HeaderProps {
  navbar: NavbarInterface[];
  handleTitlePageClick: (name: NavbarInterface["name"]) => void;
  titlePage: string;
  search: (query: string) => void;
  searchValue: string;
}

/**
 * 
 * @param navbar is varible that have array from Navbar Interface
 * @param handleTitlePageClick is function if user click the navbar
 * @param titlePage is variable to check the active navbar
 * @param search is function to search
 * @returns the header component
 */
export const Header: FC<HeaderProps> = ({
  navbar,
  handleTitlePageClick,
  titlePage,
  search,
}) => {
  useEffect(() => {
    // Adding the scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      // Removing listener
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Flag, which stores whether the screen is scrolled
  const [isScrolled, setScrolled] = useState(false);

  // Handler when page is scrolled
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <header className="container">
      <Accordion
        type="single"
        collapsible
        className="w-full lg:flex lg:items-center"
      >
        {/* dekstop and tablet navbar start */}
        <>
          <a href="/">
            <div
              className={`${
                isScrolled ? "py-2 fadeOut invisible" : "py-6 fadeIn visible"
              } font-bold text-xl items-center gap-1 hidden lg:flex lg:basis-1/12 transition-all`}
            >
              <span className="bg-foreground p-1.5 rounded text-background">
                Movies
              </span>
              Hunter
            </div>
          </a>
          <div
            className={`${
              isScrolled && "text-sm"
            } items-center gap-4 h-5 basis-full hidden lg:basis-11/12 justify-end lg:flex transition-all`}
          >
            <div className="gap-3 flex items-center">
              <Navbar
                navbar={navbar}
                onTitlePageClick={handleTitlePageClick}
                titlePage={titlePage}
              />
            </div>
            <Separator orientation="vertical" />
            <Search search={search} />
            <div className="w-auto">
              <ModeToggle />
            </div>
          </div>
        </>

        {/* dekstop and tablet navbar end */}
        <AccordionItem value="header" className="lg:hidden w-full py-4">
          <div className="flex items-center gap-4">
            <div className="font-bold text-xl items-center gap-1 flex basis-full">
              <span className="bg-foreground p-1.5 rounded text-background">
                Movies
              </span>
              Hunter
            </div>
            <AccordionTrigger>
              <Button variant="ghost" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </AccordionTrigger>
            <div className="w-auto">
              <ModeToggle />
            </div>
          </div>

          {/* mobile */}
          <AccordionContent>
            <div className="items-end flex flex-col gap-3">
              <div className="gap-3 text-right">
                <Navbar
                  navbar={navbar}
                  onTitlePageClick={handleTitlePageClick}
                  titlePage={titlePage}
                />
              </div>
              <Search search={search} />
            </div>
          </AccordionContent>
          {/* mobile */}
        </AccordionItem>
      </Accordion>
    </header>
  );
};
