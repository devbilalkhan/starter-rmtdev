import React, { useEffect } from "react";

export type TuseOnClickOutside = {
  handler : () => void;
  refs: React.RefObject<HTMLElement>[];
}

export default function useOnClickOutside(refs: React.RefObject<HTMLElement>[], handler: ()=>void) {

  useEffect(() => {
    const handlePopover = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        refs.every((ref)=> !ref.current?.contains(e.target as Node))
      ) {
        handler();
      }
    };
    document.addEventListener("click", handlePopover);
    return () => document.removeEventListener("click", handlePopover);
  }, [refs, handler]);
  
}