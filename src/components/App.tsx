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

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const { data: jobItems, isInitialLoading: isLoading } =
    useJobsItems(debouncedSearchText);

  const [currentPage, setCurentPage] = useState(1);

  const totalJobs = jobItems ? jobItems.length : 0;
  const jobItemsSliced = jobItems
    ? jobItems?.slice(currentPage * 7 - 7, currentPage * 7)
    : [];

  const totalPages = totalJobs / 7;

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
            <SortingControl />
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
