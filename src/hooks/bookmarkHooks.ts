import { useContext } from "react";
import { BookmarkContext } from "../context/BookmarksContextProvider";

export default function useBookmarksContext() {
  const context = useContext(BookmarkContext);
  return context;
};