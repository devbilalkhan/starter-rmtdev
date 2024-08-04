import { useDebounce } from "../hooks/hooks";

type ResultsCountProps = {
  totalJobs: number;
};
export default function ResultsCount({ totalJobs }: ResultsCountProps) {

  const totalJobsDebounced = useDebounce(totalJobs, 200)

  return (
    <p className="count">
      <span className="u-bold">{totalJobsDebounced} </span>
      results
    </p>
  );
}
