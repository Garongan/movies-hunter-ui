import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { NavbarInterface } from "@/services/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu } from "lucide-react";
import { FC } from "react";

interface HeaderProps {
  navbar: NavbarInterface[];
  handleTitlePageClick: (name: NavbarInterface["name"]) => void;
  titlePage: string;
  search: (query: string) => void;
  searchValue: string;
}

export const Header: FC<HeaderProps> = ({
  navbar,
  handleTitlePageClick,
  titlePage,
  search,
  searchValue,
}) => {
  return (
    <header className="container">
      <Accordion type="single" collapsible className="w-full md:flex md:items-center">
        {/* dekstop and tablet navbar start */}
        <>
          <div className="font-bold text-xl items-center gap-1 hidden md:flex md:basis-1/3">
            <span className="bg-foreground p-1.5 rounded text-background">
              Movies
            </span>
            Hunter
          </div>
          <div className="items-center gap-4 h-5 basis-full hidden md:basis-2/3 md:flex md:justify-end">
            <div className="gap-3 flex items-center">
              {titlePage == "Search Results" ? (
                <div className="text-sm font-medium activeNavbar p-1.5">
                  Search Results:{" "}
                  <span className="font-bold">{searchValue}</span>
                </div>
              ) : (
                <Navbar
                  navbar={navbar}
                  onTitlePageClick={handleTitlePageClick}
                  titlePage={titlePage}
                />
              )}
            </div>
            <Separator orientation="vertical" />
            <div className="relative">
              <span className="absolute text-2xl top-1 z-0">🔍</span>
              <Input
                type="text"
                className="w-2 relative z-10 bg-transparent transition-all text-sm border-0 inset-shadow rounded-lg focus:w-48 md:focus:w-64 focus:outline-0 focus:bg-background"
                onChange={(e) => search(e.target.value)}
              />
            </div>
          </div>
        </>

        {/* dekstop and tablet navbar end */}
        <AccordionItem value="header" className="md:hidden">
          <div className="flex items-center">
            <div className="font-bold text-xl items-center gap-1 flex basis-full">
              <span className="bg-foreground p-1.5 rounded text-background">
                Movies
              </span>
              Hunter
            </div>
            <AccordionTrigger>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </AccordionTrigger>
          </div>

          <AccordionContent>
            <div className="flex items-end flex flex-col gap-3">
              <div className="gap-3 text-right">
                {titlePage == "Search Results" ? (
                  <div className="text-sm font-medium activeNavbar p-1.5">
                    Search Results:{" "}
                    <span className="font-bold">{searchValue}</span>
                  </div>
                ) : (
                  <Navbar
                    navbar={navbar}
                    onTitlePageClick={handleTitlePageClick}
                    titlePage={titlePage}
                  />
                )}
              </div>
              <div className="relative">
                <span className="absolute text-2xl top-1 right-0 z-0">🔍</span>
                <Input
                  type="text"
                  className="w-2 relative z-10 bg-transparent transition-all text-sm border-0 inset-shadow rounded-lg focus:w-48 md:focus:w-64 focus:outline-0 focus:bg-background"
                  onChange={(e) => search(e.target.value)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </header>
  );
};
