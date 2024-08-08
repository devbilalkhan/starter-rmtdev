import useActiveIdContext from "../hooks/activeIdHooks";
import useJobItemContext from "../hooks/jobItemHooks";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList() {
  const { activeId } = useActiveIdContext();
  const { jobItems, isLoading } = useJobItemContext();
  return (
    <ul className="job-list">
      {isLoading ? (
        <Spinner />
      ) : (
        jobItems?.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            job={jobItem}
            isActive={jobItem.id === activeId}
          />
        ))
      )}
    </ul>
  );
}

export default JobList;
