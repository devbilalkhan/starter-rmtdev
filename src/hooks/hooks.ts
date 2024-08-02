import { useState, useEffect } from "react";
import { Job } from "../lib/type";

export function useJobsItems(searchText:string){

  const [jobItems, setJobItems] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const jobsSubList = jobItems.slice(0, 7);

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
  return [jobsSubList, isLoading] as const
}


export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  // for any external events such capturing urls
  useEffect(() => {
    const handleChangeHash = () => {
      // retrieve the the url with hash - check href in ListItem
      // plus sign is to convert the str into number
      setActiveId(+window.location.hash.slice(1));
    };

    window.addEventListener("hashchange", handleChangeHash);
    handleChangeHash(); //loads on first mount also if id present
    return () => {
      window.removeEventListener("hashchange", handleChangeHash);
    };
  }, []);

  return activeId
}