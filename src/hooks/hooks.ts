import { useState, useEffect } from "react";
import { JobItemType } from "../lib/type";
import { BASE_API_URL } from "../lib/constants";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { handleError } from "../lib/utils";

type idT = number | null;

const fetchJobItem = async (id: number): Promise<JobItemType> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  if (!response.ok)
    throw new Error("Something went wrong while fetching job item");
  const data = await response.json();
  const jobItem = data?.jobItem;
  return jobItem;
};

export function useJobItem(id: idT) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    ({ queryKey }: QueryFunctionContext<[string, idT]>) => {
      const [, id] = queryKey;
      return id ? fetchJobItem(id) : null;
    },
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id, // fetch only when there is an id otherwise dont fetch when mount
      onError: handleError
    }
  );

  return { data, isInitialLoading } as const;
}

export function useDebounce<T>(debouncedValue: T, delay: number = 1000): T {
  const [debouncedSearchText, setDebouncedSearchText] =
    useState<T>(debouncedValue);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchText(debouncedValue);
    }, delay);
    return () => clearTimeout(timerId);
  }, [debouncedValue, delay]);
  return debouncedSearchText;
}

const fetchJobItems = async (text: string): Promise<JobItemType[]> => {
  const response = await fetch(`${BASE_API_URL}?search=${text}`);
  if (!response.ok) {
    const errMsg = await response.json();
    throw new Error(errMsg.description);
  }
  const data = await response.json();
  if (!data || !data.jobItems)
    throw new Error("Could not find the search results");
  return data?.jobItems;
};

export function useJobsItems(searchText: string) {
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      retry: false,
      enabled: !!searchText,
      refetchOnWindowFocus: false,
      onError: handleError
    }
  );
  return { data, isInitialLoading } as const;
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
