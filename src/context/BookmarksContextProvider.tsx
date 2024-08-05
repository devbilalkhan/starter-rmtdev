import React, { createContext, useEffect, useState } from "react";

export type BookmarkContentDefaultType = {
  bookmarkedIds: number[];
  handleToggleBookmarkBtn: (id: number) => void;
};

export const BookmarkContext = createContext<BookmarkContentDefaultType>({
  bookmarkedIds: [],
  handleToggleBookmarkBtn: () => {},
});

type BookmarksContextProps = {
  children: React.ReactNode;
};

export const BookmarksContextProvider = ({
  children,
}: BookmarksContextProps) => {
  const bookmarkedIdsLocalStorage = JSON.parse(
    localStorage.getItem("bookmarked-job-items") || "[]"
  );
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>(
    () => bookmarkedIdsLocalStorage || []
  );
  const handleToggleBookmarkBtn = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds((prev) => prev.filter((prevId) => prevId !== id));
    } else {
      setBookmarkedIds((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    localStorage.setItem("bookmarked-job-items", JSON.stringify(bookmarkedIds));
  }, [bookmarkedIds]);

  return (
    <BookmarkContext.Provider
      value={{ bookmarkedIds: bookmarkedIds, handleToggleBookmarkBtn }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
