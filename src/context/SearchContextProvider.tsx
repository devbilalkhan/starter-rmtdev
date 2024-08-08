import { createContext, useState } from "react";
import { useDebounce } from "../hooks/hooks";

type SearchContext<T> = {
  searchText: T;
  handleSearchText: (newText: T) => void;
  debouncedSearchText: T;
};
type SearchContextProviderProps = {
  children: React.ReactNode;
};
export const SearchContext = createContext<SearchContext<string> | null>(null);

export default function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const handleSearchText = (newText: string) => {
    setSearchText(newText);
  };

  return (
    <SearchContext.Provider
      value={{ searchText: searchText, handleSearchText, debouncedSearchText }}
    >
      {children}
    </SearchContext.Provider>
  );
}
