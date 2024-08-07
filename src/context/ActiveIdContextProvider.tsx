import React, { createContext } from "react";
import { useActiveId } from "../hooks/hooks";

type TActiveIdContext = {
  activeId: number | null;
};

const defaultActiveId: TActiveIdContext = {
  activeId: null,
};

export const ActiveIdContext = createContext<TActiveIdContext>(defaultActiveId);

export function ActiveIdContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const activeId = useActiveId();

  return (
    <ActiveIdContext.Provider value={{ activeId }}>
      {children}
    </ActiveIdContext.Provider>
  );
}
