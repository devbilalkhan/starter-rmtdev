import { useContext } from "react";
import { SearchContext } from "../context/SearchContextProvider";


export default function useSearchTextContext() {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useContext must be usd within a SearchText Context provider")
   return context;
}