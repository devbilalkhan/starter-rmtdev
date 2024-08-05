import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { TPageDirection } from "../lib/type";

type PaginationControlsProps = {
  onClick: (direction: TPageDirection) => void;
  currentPage: number;
  totalPages: number;
};

type PaginationButtonProps = Omit<PaginationControlsProps, "totalPages"> & {
  direction: TPageDirection;
};

export default function PaginationControls({
  onClick,
  currentPage,
  totalPages,
}: PaginationControlsProps) {
  return (
    <section className="pagination">
      {currentPage > 0 && (
        <PaginationButton
          onClick={onClick}
          currentPage={currentPage}
          direction="previous"
        />
      )}

      {currentPage <= totalPages && (
        <PaginationButton
          onClick={onClick}
          currentPage={currentPage + 1}
          direction="next"
        />
      )}
    </section>
  );
}

export function PaginationButton({
  onClick,
  currentPage,
  direction,
}: PaginationButtonProps) {
  return (
    <>
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          onClick(direction);
          e.currentTarget.blur();
        }}
        className={`pagination__button pagination__button--${direction}`}
      >
        {direction === "previous" && <ArrowLeftIcon />}
        Page {currentPage}
        {direction === "next" && <ArrowRightIcon />}
      </button>
    </>
  );
}
