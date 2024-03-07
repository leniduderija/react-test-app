import React, { ReactNode } from "react";
import "../Layout.css";
import "./MainLayout.css";
import { Header, Footer } from "components/layout";
import { BaseComponent } from "utils/type-defs";
import withLogger from "services/hoc/withLogger";
import { LOG_MESSAGE } from "config";

interface MainLayoutProps extends BaseComponent {
  children: ReactNode;
}

const MainLayoutBase = ({ children }: MainLayoutProps) => {
  return (
    <div className="MainLayout" data-testid="MainLayout">
      <Header logMessage={LOG_MESSAGE} />
      <main className="Main">{children}</main>
      <Footer logMessage={LOG_MESSAGE} />
    </div>
  );
};

export const MainLayout = withLogger(MainLayoutBase);
