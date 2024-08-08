import { useDebounce } from "../hooks/hooks";
import useJobItemContext from "../hooks/jobItemHooks";

export default function ResultsCount() {
  const { totalJobs } = useJobItemContext();
  const totalJobsDebounced = useDebounce(totalJobs, 200);

  return (
    <p className="count">
      <span className="u-bold">{totalJobsDebounced} </span>
      results
    </p>
  );
}
