import useBookmarksContext from "../hooks/bookmarkHooks";
import JobList from "./JobList";

export default function BookmarksPopover() {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();
  console.log(bookmarkedJobItems);
  return (
    <div className="bookmarks-popover">
      <JobList isLoading={isLoading} jobsItems={bookmarkedJobItems} />
    </div>
  );
}
