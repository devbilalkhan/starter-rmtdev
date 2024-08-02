import { useEffect, useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

function App() {
  const [jobItems, setJobItems] = useState([]);
  const [searchText, setSearctText] = useState("");

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
      <Header searchText={searchText} setSearchText={setSearctText} />
      <Container jobItems={jobItems} />
      <Footer />
    </>
  );
}

export default App;
