import React, { AllHTMLAttributes } from "react";
import "./Card.css";
import cn from "classnames";
import withLogger from "services/hoc/withLogger";

interface CardProps extends AllHTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
}
const CardBase = ({ children, className, onClick }: CardProps) => {
  return (
    <div className={cn("Card", className)} onClick={onClick} data-testid="Card">
      {children}
    </div>
  );
};

export const Card = withLogger(CardBase);
