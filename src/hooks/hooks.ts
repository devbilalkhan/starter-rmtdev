import { useState, useEffect } from "react";
import { Job, JobItemType } from "../lib/type";
import { BASE_API_URL } from "../lib/constants";
import { useQuery } from "@tanstack/react-query";

export function useDebounce<T>(debouncedValue
  : T, delay:number = 1000):T {
  const [debouncedSearchText, setDebouncedSearchText] = useState<T>(debouncedValue);
 
  useEffect(() => {
   const timerId = setTimeout(() => {
      setDebouncedSearchText(debouncedValue);
    }, delay);
  return () => clearTimeout(timerId)
  }, [debouncedValue
    , delay]);
  return debouncedSearchText
}

export function useJobsItems(searchText: string) {
  const [jobItems, setJobItems] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const jobsSubList = jobItems.slice(0, 7);

  const totalJobs = jobItems.length;

  useEffect(() => {
    if (!searchText) return;
    const fetchJobsList = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_API_URL}?search=${searchText}`);

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
  return { jobsSubList, isLoading, totalJobs } as const;
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

  return activeId;
}

// export function useJobItem(id: number | null) {
//   const [job, setJob] = useState<JobItemType | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (!id) return;
//     setIsLoading(true);
//     const fetchJobDetails = async () => {
//       try {
//         const response = await fetch(`${BASE_API_URL}/${id}`);
//         if (!response.ok) throw new Error();
//         const data = await response.json();

//         setJob(data.jobItem as JobItemType);
//       } catch (err) {
//         console.log("something went wrong");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchJobDetails();
//   }, [id]);

//   return [job, isLoading] as const;
// }

export function useJobItem(id: number | null){
    const {data, isLoading} = useQuery(['job-item', id], 
      async () => {
        const response = await fetch(`${BASE_API_URL}/${id}`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        return data.jobItem as JobItemType
      },
      {
        staleTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!id, // fetch only when there is an id otherwise dont fetch when mount
        onError: () => {},
      }
    )
    
    return {data , isLoading} as const
}
