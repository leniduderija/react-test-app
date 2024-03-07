import React, { ReactNode } from "react";
import "./Container.css";
import { BaseComponent } from "utils";
import withLogger from "services/hoc/withLogger";

interface ContainerProps extends BaseComponent {
  children: ReactNode;
}

const ContainerBase = ({ children }: ContainerProps) => {
  return (
    <div className="container" data-testid="container">
      {children}
    </div>
  );
};

export const Container = withLogger(ContainerBase);
