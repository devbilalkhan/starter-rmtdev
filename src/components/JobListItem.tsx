import { Job } from "../lib/type";
import BookmarkIcon from "./BookmarkIcon";

type JobProps = {
  job: Job;
};

export default function istItem({
  job: { title, badgeLetter, company, daysAgo },
}: JobProps) {
  return (
    <li className="item">
      <a className="item__link">
        <div className="item__badge">{badgeLetter}</div>

        <div className="item__middle">
          <h3 className="third-heading">{title}</h3>
          <p className="item__company">{company}</p>
        </div>

        <div className="item__right">
          <BookmarkIcon />
          <time className="item__time">{daysAgo} d</time>
        </div>
      </a>
    </li>
  );
}
