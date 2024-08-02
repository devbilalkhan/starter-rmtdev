import { Job } from "../lib/type";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListProps = {
  jobItems: Job[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: JobListProps) {
  return (
    <ul className="job-list">
      {isLoading ? (
        <Spinner />
      ) : (
        jobItems.map((jobItem) => (
          <JobListItem key={jobItem.id} job={jobItem} />
        ))
      )}
    </ul>
  );
}

export default JobList;
