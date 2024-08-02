import { Job } from "../lib/type";
import JobListItem from "./JobListItem";

type JobListProps = {
  jobItems: Job[];
};

export function JobList({ jobItems }: JobListProps) {
  return (
    <ul className="job-list">
      {jobItems.map((jobItem) => (
        <JobListItem key={jobItem.id} job={jobItem} />
      ))}
    </ul>
  );
}

export default JobList;
