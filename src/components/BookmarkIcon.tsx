import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import useBookmarksContext from "../hooks/bookmarkHooks";

type BookmarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkedIds, handleToggleBookmarkBtn } = useBookmarksContext();

  return (
    <button
      onClick={(e) => {
        handleToggleBookmarkBtn(id);
        e.stopPropagation();
        e.preventDefault();
      }}
      className="bookmark-btn"
    >
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(id) ? "filled" : ""}`}
      />
    </button>
  );
}
