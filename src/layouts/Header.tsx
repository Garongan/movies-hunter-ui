import { Navbar } from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { NavbarInterface } from "@/services/types";
import { FC,} from "react";

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
    <header className="container flex flex-row items-center flex-wrap">
      <div className="font-bold text-xl basis-1/3 flex items-center justify-start gap-1">
        <span className="bg-foreground p-1.5 rounded text-background">
          Movies
        </span>
        Hunter
      </div>
      <div className="items-center flex justify-end basis-2/3 gap-4">
        <div className="gap-3 flex items-center">
          <Navbar
            navbar={navbar}
            onTitlePageClick={handleTitlePageClick}
            titlePage={titlePage}
          />
        </div>
        <Input
          type="text"
          placeholder="🔍 Search Movies..."
          className="w-48 transition-all text-sm text-foreground bg-background border-0 inset-shadow rounded-lg focus:w-64 focus:outline-0"
          onChange={(e) => search(e.target.value)}
        />
      </div>
    </header>
  );
};
