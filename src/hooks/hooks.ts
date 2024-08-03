import { useState, useEffect } from "react";
import { Job, JobItemType } from "../lib/type";
import { BASE_API_URL } from "../lib/constants";

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
          `${BASE_API_URL}?search=${searchText}`
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


export function useJobItem(activeId: number | null) {
  const [job, setJob] = useState<JobItemType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!activeId) return;
    setIsLoading(true);
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/${activeId}`);
        if (!response.ok) throw new Error();
        const data = await response.json();
   
        setJob(data.jobItem as JobItemType);
      } catch (err) {
        console.log("something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobDetails();
  }, [activeId]);

  return [job, isLoading] as const
}