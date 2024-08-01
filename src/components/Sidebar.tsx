import JobListItem from "./JobListItem";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControl from "./SortingControls";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount />
        <SortingControl />
      </div>
      <JobListItem />
      <PaginationControls />
    </div>
  );
}
