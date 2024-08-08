import useJobItemContext from "../hooks/jobItemHooks";
import JobList from "./JobList";

const JobSearchList = () => {
  const { jobItemsSliced, isLoading } = useJobItemContext();
  return <JobList jobItems={jobItemsSliced} isLoading={isLoading} />;
};

export default JobSearchList;
