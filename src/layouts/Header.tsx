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
import { FC } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { Search } from "@/components/Search";

interface HeaderProps {
  navbar: NavbarInterface[];
  handleTitlePageClick: (name: NavbarInterface["name"]) => void;
  titlePage: string;
  search: (query: string) => void
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
    <header className="container text-sm">
      <Accordion
        type="single"
        collapsible
        className="w-full md:flex md:items-center"
      >
        {/* dekstop and tablet navbar start */}
        <>
          <div className="font-bold items-center gap-1 hidden md:flex md:basis-1/3">
            <span className="bg-foreground p-1.5 rounded text-background">
              Movies
            </span>
            Hunter
          </div>
          <div className="items-center gap-4 h-5 basis-full hidden md:basis-2/3 md:flex md:justify-end">
            <div className="gap-3 flex items-center">
              <Navbar
                navbar={navbar}
                onTitlePageClick={handleTitlePageClick}
                titlePage={titlePage}
              />
              {titlePage == "Search Results" && (
                <div className="font-medium activeNavbar p-1.5">
                  Search Results:{" "}
                  <span className="font-bold">{searchValue}</span>
                </div>
              )}
            </div>
            <Separator orientation="vertical" />
            <Search search={search} />
            <div className="w-auto">
              <ModeToggle />
            </div>
          </div>
        </>

        {/* dekstop and tablet navbar end */}
        <AccordionItem value="header" className="md:hidden w-full">
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
            <div className="flex items-end flex flex-col gap-3">
              <div className="gap-3 text-right">
                <Navbar
                  navbar={navbar}
                  onTitlePageClick={handleTitlePageClick}
                  titlePage={titlePage}
                />
                {titlePage == "Search Results" && (
                  <div className="font-medium activeNavbar p-1.5">
                    Search Results:{" "}
                    <span className="font-bold">{searchValue}</span>
                  </div>
                )}
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
