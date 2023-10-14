import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FC, FormEvent, useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { Separator } from "./ui/separator";

interface SearchProps {
  search: (query: string) => void;
}

export const Search: FC<SearchProps> = ({ search }) => {
  const [searchInput, setSearchInput] = useState("");
  const [prevSearchInputs, setPrevSearchInputs] = useState<string[]>([]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search(searchInput);
    setPrevSearchInputs((prevInputs) => [...prevInputs, searchInput]);
    setSearchInput("");
  };

  useEffect(() => {
    console.log("Previous Search Inputs:", prevSearchInputs);
  }, [prevSearchInputs]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="inset-shadow h-10 px-4 py-2 rounded-lg">
          Search Movie...
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          className="flex items-center rounded-lg px-5"
          onSubmit={handleSubmit}
        >
          <SearchIcon className="mr-2 h-4 w-4 shrink-0" />
          <Input
            type="text"
            placeholder="Type to search..."
            value={searchInput}
            className="flex outline-none focus:outline focus:bg-background"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button type="submit" variant="ghost">
            Search
          </Button>
        </form>
        <Separator orientation="horizontal" />
        {prevSearchInputs.map((item, index) => (
          <div
            key={index}
            className="hover:bg-foreground/50 rounded-lg py-2 px-5 flex items-center"
          >
            <SearchIcon className="mr-2 h-4 w-4 shrink-0" /> {item}
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};
