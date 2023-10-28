import { FC, FormEvent, useState } from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "./ui/separator";

interface SearchProps {
  search: (query: string) => void; // Function to handle search action
}

export const Search: FC<SearchProps> = ({ search }) => {
  // State variables
  const [searchInput, setSearchInput] = useState(""); // Holds the value of the search input
  const [prevSearchInputs, setPrevSearchInputs] = useState<string[]>([]); // Holds previous search inputs

  // Event handler for form submission
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Check if search input is valid (more than 3 characters)
    if (searchInput.length > 3) {
      search(searchInput); // Call the search function passed via props
      setPrevSearchInputs((prevInputs) => [...prevInputs, searchInput]); // Save search input to previous inputs list
      setSearchInput(""); // Clear the search input field
    }
  };

  return (
    <Dialog>
      {/* Trigger for the dialog */}
      <DialogTrigger asChild>
        <div className="inset-shadow h-10 px-4 py-2 rounded-lg">
          Search Movies...
        </div>
      </DialogTrigger>
      {/* Content of the dialog */}
      <DialogContent className="sm:max-w-[425px]">
        {/* Search form */}
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
        {/* Error message for short search input */}
        {searchInput.length < 3 && (
          <div className="text-center font-light text-sm">
            Search input must be more than 3 characters
          </div>
        )}
        <Separator orientation="horizontal" />
        {/* Previous search inputs */}
        {prevSearchInputs.map((item, index) => (
          <button
            key={index}
            className="hover:bg-foreground/50 rounded-lg py-2 px-5 flex items-center"
            onClick={() => search(item)} // Perform search on previous input click
          >
            <SearchIcon className="mr-2 h-4 w-4 shrink-0" /> {item}
          </button>
        ))}
      </DialogContent>
    </Dialog>
  );
};
