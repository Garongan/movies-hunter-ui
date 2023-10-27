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
}) => {
  return (
    <header className="container">
      <Accordion
        type="single"
        collapsible
        className="w-full lg:flex lg:items-center"
      >
        {/* dekstop and tablet navbar start */}
        <>
          <div className="font-bold text-xl items-center gap-1 hidden lg:flex lg:basis-1/12 bg-background shadow-xl dark:shadow-lg-dark sticky top-0 z-10 py-4">
            <span className="bg-foreground p-1.5 rounded text-background">
              Movies
            </span>
            Hunter
          </div>
          <div className="items-center gap-4 h-5 basis-full hidden lg:basis-11/12 lg:flex lg:justify-end">
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
        <AccordionItem value="header" className="lg:hidden w-full">
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
