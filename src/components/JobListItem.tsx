import { Job } from "../lib/type";
import BookmarkIcon from "./BookmarkIcon";

type JobProps = {
  job: Job;
};

export default function istItem({
  job: { title, badgeLetter, company, daysAgo },
}: JobProps) {
  return (
    <li className="job-item">
      <a className="job-item__link">
        <div className="job-item__badge">{badgeLetter}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{title}</h3>
          <p className="job-item__company">{company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon />
          <time className="job-item__time">{daysAgo} d</time>
        </div>
      </a>
    </li>
  );
}
