import { Navbar } from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { NavbarInterface } from "@/services/types";
import { FC } from "react";

interface HeaderProps {
  navbar: NavbarInterface[];
  handleTitlePageClick: (name: NavbarInterface["name"]) => void;
  titlePage: string;
  search: (query: string) => void;
}

export const Header: FC<HeaderProps> = ({
  navbar,
  handleTitlePageClick,
  titlePage,
  search,
}) => {
  return (
    <header className="container flex flex-row items-center flex-wrap gap-4 md:gap-0">
      <div className="font-bold text-xl items-center gap-1 justify-center basis-full md:basis-1/3 flex md:justify-start">
        <span className="bg-foreground p-1.5 rounded text-background">
          Movies
        </span>
        Hunter
      </div>
      <div className="items-center flex justify-center gap-4 h-5 basis-full md:basis-2/3 md:justify-end">
        <div className="gap-3 flex items-center">
          <Navbar
            navbar={navbar}
            onTitlePageClick={handleTitlePageClick}
            titlePage={titlePage}
          />
        </div>
        <Separator orientation="vertical" />
        <div className="relative">
          <span className="absolute text-2xl top-1 z-0">🔍</span>
          <Input
            type="text"
            className="w-1 relative z-10 bg-transparent transition-all text-sm border-0 inset-shadow rounded-lg focus:w-64 focus:outline-0 focus:bg-background"
            onChange={(e) => search(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
};
