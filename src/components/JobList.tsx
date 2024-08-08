import useActiveIdContext from "../hooks/activeIdHooks";
import { JobItemType } from "../lib/type";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList({
  jobItems,
  isLoading,
}: {
  jobItems: JobItemType[];
  isLoading: boolean;
}) {
  const { activeId } = useActiveIdContext();
  return (
    <ul className="job-list">
      {isLoading ? (
        <Spinner />
      ) : (
        jobItems?.map((jobItem: JobItemType) => (
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
