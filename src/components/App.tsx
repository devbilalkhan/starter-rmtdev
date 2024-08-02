import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import Searchform from "./SearchForm";

function App() {
  const [jobItems, setJobItems] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!searchText) return;
    const fetchJobsList = async () => {
      try {
        const response = await fetch(
          `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
        );

        if (!response.ok) throw new Error();
        const data = await response.json();

        setJobItems(data.jobItems);
      } catch (err) {
        console.error("Something went wrong in fetching jobs list.");
      }
    };
    fetchJobsList();
  }, [searchText]);
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
      <Container jobItems={jobItems} />
      <Footer />
    </>
  );
}

export default App;
