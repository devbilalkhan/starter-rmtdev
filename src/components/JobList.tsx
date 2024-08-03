import { useActiveId } from "../hooks/hooks";
import { Job } from "../lib/type";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobsItems: Job[];
  isLoading: boolean;
};

export function JobList({ jobsItems, isLoading }: JobListProps) {
  const activeId = useActiveId()
  return (
    <ul className="job-list">
      {isLoading ? (
        <Spinner />
      ) : (
        jobsItems.map((jobItem) => (
          <JobListItem key={jobItem.id} job={jobItem} isActive={jobItem.id === activeId} />
        ))
      )}
    </ul>
  );
}

export default JobList;
