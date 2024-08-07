import { useContext } from "react";
import { ActiveIdContext } from "../context/ActiveIdContextProvider";



export default function useActiveIdContext() {
  const context = useContext(ActiveIdContext);
  if (!context) throw new Error("useContext must be usd within a ActiveId Context provider")
   return context;
}