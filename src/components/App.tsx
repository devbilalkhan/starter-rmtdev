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
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>
        <Searchform />
      </Header>
      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount />
            <SortingControl />
          </SidebarTop>
          <JobList />
          <PaginationControls />
        </Sidebar>
        <JobItemContent />
      </Container>
      <Footer />
      <Toaster position={"top-center"} />
    </>
  );
}

export default App;
