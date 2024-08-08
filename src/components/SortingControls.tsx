import useJobItemContext from "../hooks/jobItemHooks";
import { TSortBy } from "../lib/type";

type SortingControlProps = {
  handleSorting: (sortByValue: TSortBy) => void;
  sortBy: string;
};

type SortingButtonProps = SortingControlProps & {
  sortingType: TSortBy;
};

export default function SortingControl() {
  const { handleSorting, sortBy } = useJobItemContext();
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        handleSorting={handleSorting}
        sortingType="relevance"
        sortBy={sortBy === "relevance" ? "active" : ""}
      />
      <SortingButton
        handleSorting={handleSorting}
        sortingType="recent"
        sortBy={sortBy === "recent" ? "active" : ""}
      />
    </section>
  );
}

export function SortingButton({
  handleSorting,
  sortingType,
  sortBy,
}: SortingButtonProps) {
  return (
    <>
      <button
        onClick={() => {
          handleSorting(sortingType);
        }}
        className={`sorting__button sorting__button--${sortingType} sorting__button--${sortBy}`}
      >
        {sortingType.toUpperCase()}
      </button>
    </>
  );
}
