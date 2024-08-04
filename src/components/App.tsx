import { useEffect, useState } from "react";
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

function App() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);

  const {
    jobsSubList: jobsItems,
    isLoading,
    totalJobs,
  } = useJobsItems(debouncedSearchText);

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
          <JobList jobsItems={jobsItems} isLoading={isLoading} />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
