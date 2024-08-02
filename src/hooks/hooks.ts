import { useState, useEffect } from "react";

export function useJobsItems(){

  const [jobItems, setJobItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchText) return;
    const fetchJobsList = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
        );

        if (!response.ok) throw new Error();
        const data = await response.json();

        setJobItems(data.jobItems);
      } catch (err) {
        console.error("Something went wrong in fetching jobs list.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobsList();
  }, [searchText]);
  return {
    jobItems, setJobItems, 
    searchText, setSearchText, 
    isLoading, setIsLoading
  }
}