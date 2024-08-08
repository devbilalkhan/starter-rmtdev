import React, { createContext, useMemo, useState } from "react";
import useSearchTextContext from "../hooks/searchTextHook";
import { useSearchQuery } from "../hooks/hooks";
import { TSortBy, TPageDirection, JobItemType, Job } from "../lib/type";
import { RESULTS_PER_PAGE } from "../lib/constants";

type JobItemContextType = {
  handlePagination: (direction: TPageDirection) => void;
  handleSorting: (sortByValue: TSortBy) => void;
  totalPages: number;
  jobItemSorted: JobItemType[];
  jobItemsSliced: JobItemType[];
  totalJobs: number;
  isLoading: boolean;
  sortBy: string;
  jobItems: Job[] | undefined;
  currentPage: number;
};

export const JobItemContext = createContext<JobItemContextType | null>(null);

export function JobItemContentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { debouncedSearchText } = useSearchTextContext();
  const { data: jobItems, isInitialLoading: isLoading } =
    useSearchQuery(debouncedSearchText);

  const [currentPage, setCurentPage] = useState(1);
  const [sortBy, setSortBy] = useState<TSortBy>("relevance");

  const jobItemSorted = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "relevance") return b.relevanceScore - a.relevanceScore;
        if (sortBy === "recent") return a.daysAgo - b.daysAgo;
        return 0;
      }),
    [jobItems, sortBy]
  );

  const totalJobs = useMemo(() => (jobItems ? jobItems.length : 0), [jobItems]);
  
  const jobItemsSliced = useMemo(() => {
    if (!jobItemSorted) return [];
    return jobItemSorted.slice(
      currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
      currentPage * RESULTS_PER_PAGE
    );
  }, [jobItemSorted, currentPage]);

  const totalPages = totalJobs / RESULTS_PER_PAGE;

  const handleSorting = (sortByValue: TSortBy) => {
    setSortBy(sortByValue);
  };

  const handlePagination = (direction: TPageDirection) => {
    if (direction === "next") {
      setCurentPage((prev) => prev + 1);
    }
    if (direction === "previous") {
      setCurentPage((prev) => prev - 1);
    }
  };

  return (
    <JobItemContext.Provider
      value={{
        handlePagination,
        handleSorting,
        totalPages,
        jobItemSorted,
        jobItemsSliced,
        isLoading,
        totalJobs,
        sortBy,
        jobItems,
        currentPage,
      }}
    >
      {children}
    </JobItemContext.Provider>
  );
}
