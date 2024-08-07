import { forwardRef } from "react";
import useBookmarksContext from "../hooks/bookmarkHooks";
import JobList from "./JobList";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();

  return (
    <div ref={ref} className="bookmarks-popover">
      <JobList isLoading={isLoading} jobsItems={bookmarkedJobItems} />
    </div>
  );
});

export default BookmarksPopover;
