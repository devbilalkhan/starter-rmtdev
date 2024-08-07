import { createContext } from "react";
import useLocalStorage from "../hooks/LocalStorageHook";
import { BookmarkContentDefaultType, BookmarksContextProps } from "../lib/type";
import { useJobItems } from "../hooks/hooks";

export const BookmarkContext = createContext<BookmarkContentDefaultType>({
  bookmarkedIds: [],
  handleToggleBookmarkBtn: () => {},
  bookmarkedJobItems: [],
  isLoading: false,
});

/**
 * Provides context for managing bookmarked job IDs using local storage.
 *
 */
export const BookmarksContextProvider = ({
  children,
}: BookmarksContextProps) => {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarked-job-ids",
    []
  );

  const { jobItems: bookmarkedJobItems, isLoading } =
    useJobItems(bookmarkedIds);

  const handleToggleBookmarkBtn = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((prevId) => prevId !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkedIds: bookmarkedIds,
        handleToggleBookmarkBtn,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
