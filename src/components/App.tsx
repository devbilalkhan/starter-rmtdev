import { useState } from "react";
import Background from "./Background";
import { Container } from "./Container";
import Footer from "./Footer";
import { Header, HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import Searchform from "./SearchForm";
import { Sidebar, SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import SortingControl from "./SortingControls";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import { useDebounce, useJobsItems } from "../hooks/hooks";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { TSortBy } from "../lib/type";

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const { data: jobItems, isInitialLoading: isLoading } =
    useJobsItems(debouncedSearchText);

  const [currentPage, setCurentPage] = useState(1);
  const [sortBy, setSortBy] = useState<TSortBy>("relevance");

  const jobItemSorted = jobItems?.sort((a, b) => {
    if (sortBy === "relevance") return b.relevanceScore - a.relevanceScore;
    if (sortBy === "recent") return a.daysAgo - b.daysAgo;
    return 0;
  });

  const totalJobs = jobItems ? jobItems.length : 0;
  const jobItemsSliced = jobItemSorted
    ? jobItemSorted?.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      )
    : [];

  const totalPages = totalJobs / RESULTS_PER_PAGE;

  const handleSorting = (sortByValue: TSortBy) => {
    setSortBy(sortByValue);
  };

  const handlePagination = (direction: "next" | "previous") => {
    if (direction === "next") {
      setCurentPage((prev) => prev + 1);
    }
    if (direction === "previous") {
      setCurentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <Searchform searchText={searchText} setSearchText={setSearchText} />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalJobs={totalJobs} />
            <SortingControl handleSorting={handleSorting} sortBy={sortBy} />
          </SidebarTop>
          <JobList jobsItems={jobItemsSliced} isLoading={isLoading} />
          <PaginationControls
            onClick={handlePagination}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
      <Toaster position={"top-center"} />
    </>
  );
}

export default App;
