import React from "react";

type HeaderProps = {
  children: React.ReactNode;
};

export function Header({ children }: HeaderProps) {
  return <header className="header">{children}</header>;
}

export function HeaderTop({ children }: HeaderProps) {
  return <div className="header__top">{children}</div>;
}
