import { useActiveId } from "../hooks/hooks";
import { JobItemType } from "../lib/type";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobsItems: JobItemType[];
  isLoading: boolean;
};

export function JobList({ jobsItems, isLoading }: JobListProps) {
  const activeId = useActiveId();
  return (
    <ul className="job-list">
      {isLoading ? (
        <Spinner />
      ) : (
        jobsItems.map((jobItem) => (
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
