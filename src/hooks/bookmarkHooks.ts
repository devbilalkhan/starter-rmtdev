import { useContext } from "react";
import { BookmarkContext } from "../context/BookmarksContextProvider";

export default function useBookmarksContext() {
  const context = useContext(BookmarkContext);
  if (!context) throw new Error("useContext must be usd within a BookmarkContext provider")
   return context;
}