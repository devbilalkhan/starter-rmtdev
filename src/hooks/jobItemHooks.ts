import { useContext } from "react";
import { JobItemContext } from "../context/JobItemContextProvider";

export default function useJobItemContext() {
  const context = useContext(JobItemContext);
  if (!context) throw new Error("useContext must be usd within a JobItem Context provider")
   return context;
}