import React from "react";
import "./Footer.css";
import withLogger from "services/hoc/withLogger";

const FooterBase = () => {
  return (
    <footer className="Footer" data-testid="Footer">
      Copyright &#169; 2024 Leni Đuderija
    </footer>
  );
};
export const Footer = withLogger(FooterBase);
