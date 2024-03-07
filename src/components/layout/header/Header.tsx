import React from "react";
import "./Header.css";
import withLogger from "services/hoc/withLogger";

const HeaderBase = () => {
  return (
    <header className="Header" data-testid="Header">
      <a href="/posts" className="logo-img">
        POSTS DEMO
      </a>
    </header>
  );
};

export const Header = withLogger(HeaderBase);
